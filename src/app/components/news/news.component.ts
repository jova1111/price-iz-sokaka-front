import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../model/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ NewsService ]
})
export class NewsComponent implements OnInit {

  private isLoaded: boolean;
  private id: number;
  private news: News;

  constructor(private newsService: NewsService, private route: ActivatedRoute) { }

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

}
