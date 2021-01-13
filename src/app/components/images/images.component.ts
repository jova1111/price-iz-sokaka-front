import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Image } from '../../model/Image';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  public isLogged;
  public images: Image[] = [];
  public isLoaded: boolean;

  constructor(private authService: AuthService,
    private imageService: ImageService,
    public toastManager: ToastsManager) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();

    this.imageService.getAll()
      .then((images: Image[]) => {
        this.images = images;
        this.isLoaded = true;
      })
      .catch((error) => {
        this.toastManager.error(error);
        this.isLoaded = true;
      });
  }

}
