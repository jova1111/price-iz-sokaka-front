import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../model/News';

@Component({
  selector: 'app-news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./news-preview.component.css']
})
export class NewsPreviewComponent implements OnInit {

  @Input()
  private news: News;

  constructor() { }

  ngOnInit() {
  }

}
