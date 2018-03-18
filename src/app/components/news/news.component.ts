import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../model/News';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ NewsService ]
})
export class NewsComponent implements OnInit {

  public isLoaded: boolean;
  public isLogged: boolean;
  private id: number;
  public news: News;

  constructor(private newsService: NewsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.newsService.getById(this.id)
      .then(success => {
        this.news = new News(success);
        this.isLoaded = true;
      })
      .catch(error => {
        console.log(error);
      })

    this.isLogged = this.authService.isAuthenticated();
  }

  public delete() {
    this.newsService.delete(this.id)
      .then(success => {
        alert(success);
        this.router.navigate(['/']);
        window.location.reload(true);
      })
      .catch(error => {
        alert(error);
      })
  }

  public update() {
    this.router.navigate(['/edit_news/' + this.id]);
  }

}
