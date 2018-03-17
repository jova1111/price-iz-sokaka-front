import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';
import { News } from '../../model/News';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  providers: [ NewsService ]
})
export class NewsListComponent implements OnInit {

  public isLogged: boolean;
  public isLoaded: boolean;
  public allNews: News[] = [];

  constructor(private authService: AuthService, private newsService: NewsService) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
    this.newsService.getAllNews()
      .then(responseNews => {
        for(let index in responseNews) {
          this.allNews.push(new News(responseNews[index]));
        }
        this.isLoaded = true;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
