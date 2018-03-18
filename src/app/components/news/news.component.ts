import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../model/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ NewsService ]
})
export class NewsComponent implements OnInit {

  public isLoaded: boolean;
  private id: number;
  public news: News;

  constructor(private newsService: NewsService, private route: ActivatedRoute, private router: Router) { }

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

}
