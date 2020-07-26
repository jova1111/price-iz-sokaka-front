import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { News } from '../../model/News';
import { NewsService } from '../../services/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/finally';
import { ToastsManager } from 'ng2-toastr';
import * as filestack from 'filestack-js';

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
  private uploadedImageName: string;

  constructor(public toastManager: ToastsManager, private newsService: NewsService, private router: Router, private route: ActivatedRoute) {
  }

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
        .then(success => {
          this.router.navigate(['/news']);
          this.toastManager.success("Успешно додао вест!");
        })
        .catch(error => {
          this.toastManager.error("Дошло је до грешке приликом додавања.");
        });
      } else {
        this.newsService.update(this.id, this.news)
          .then(success => {
            this.toastManager.success("Успешно изменио вест!");
            this.router.navigate(['/news']);
          })
          .catch(error => {
            this.toastManager.error("Дошло је до грешке приликом измене.");
          })
      }
  }

  public onUploadButtonClick(event) {
    const client = filestack.init('AKUvqfvWjQIyRw3vXkfMuz');
    client.picker({
      accept: 'image/*',
      dropPane: {},
      onFileUploadFinished: file => {
        this.uploadedImageName = file.filename;
        this.news.imageUrl = file.url;
      }}).open();
  }

}
