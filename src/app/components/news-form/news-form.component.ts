import { Component, OnInit } from '@angular/core';
import { News } from '../../model/News';
import { NewsService } from '../../services/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {

  public news = new News("");
  public error: string;
  public editMode: boolean;
  private id: number;
  public isLoaded: boolean;

  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params["id"]) {
        this.id = +params["id"];
        this.editMode = true;
        this.newsService.getById(this.id)
          .then(news => {
            this.news = new News(news);
            this.isLoaded = true;
          })
          .catch(error => {
            console.log("error");
            this.isLoaded = true;
          });
      } else {
        this.isLoaded = true;
      }
    });
  }

  public onSubmit() {
      if(!this.editMode) {
      this.newsService.save(this.news)
        .then(succes => {
          this.router.navigate(['/news']);
          window.location.reload();
        })
        .catch(error => console.log(error));
      } else {
        this.newsService.update(this.id, this.news)
          .then(success => {
            alert("Успешно апдејтово.");
            this.router.navigate(['/news']);
            window.location.reload();
          })
          .catch(error => {
            alert("Дошло је до грешке приликом апдејтовања.");
          })
      }
  }

}
