import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Image } from '../../model/Image';
import { ImageService } from '../../services/image.service';
import * as filestack from 'filestack-js';

@Component({
  selector: 'app-images-form',
  templateUrl: './images-form.component.html',
  styleUrls: ['./images-form.component.css']
})
export class ImagesFormComponent implements OnInit {
  public image = new Image('');
  public error: string;
  public isLoaded: boolean;
  private uploadedImageName: string;

  constructor(private imageService: ImageService,
    private toastManager: ToastsManager,
    private router: Router) { }

  ngOnInit() {
    this.isLoaded = true;
  }

  public onSubmit() {
    this.isLoaded = false;
    this.imageService.save(this.image)
      .then(success => {
        this.toastManager.success('Успешно додао слику!');
        this.router.navigate(['/images']);
      })
      .catch(error => {
        this.toastManager.error('Дошло је до грешке приликом измене.');
        this.isLoaded = true;
      });
  }

public onUploadButtonClick(event) {
  const client = filestack.init('AKUvqfvWjQIyRw3vXkfMuz');
  client.picker({
    accept: 'image/*',
    dropPane: {},
    onFileUploadFinished: file => {
      this.uploadedImageName = file.filename;
      this.image.url = file.url;
    }}).open();
}
}
