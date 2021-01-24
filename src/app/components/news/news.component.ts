import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser'
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../model/News';
import { AuthService } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public isLoaded: boolean;
  public isLogged: boolean;
  private id: number;
  public news: News;
  public content: SafeHtml;

  constructor(private sanitizer: DomSanitizer,
    private toastManager: ToastsManager,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.newsService.getById(this.id)
      .then(success => {
        this.news = new News(success);
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.news.content);
        this.isLoaded = true;
      })
      .catch(error => {
        console.log(error);
      });

    this.isLogged = this.authService.isAuthenticated();
  }

  public delete() {
    if (!confirm('Да ли сте сигурни да хоћете да избришете вест?')) {
      return;
    }

    this.newsService.delete(this.id)
      .then(success => {
        this.toastManager.success('Успешно сте избрисали вест.');
        this.router.navigate(['/news']);
      })
      .catch(error => {
        this.toastManager.error(error);
      });
  }

  public update() {
    this.router.navigate(['/edit_news/' + this.id]);
  }

}
