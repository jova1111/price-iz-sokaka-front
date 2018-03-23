import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-image-form',
  templateUrl: './upload-image-form.component.html',
  styleUrls: ['./upload-image-form.component.css']
})
export class UploadImageFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onUploadFinished(event) {
    console.log("eee");
  }

}
