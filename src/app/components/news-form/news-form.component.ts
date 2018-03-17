import { Component, OnInit } from '@angular/core';
import { News } from '../../model/News';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
  providers: [ NewsService ]
})
export class NewsFormComponent implements OnInit {

  private news = new News("");

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
  }

  private onSubmit() {
    this.newsService.save(this.news)
      .then(succes => {
        this.router.navigate(['/']);
        window.location.reload();
      })
      .catch(error => console.log(error));
  }

}
