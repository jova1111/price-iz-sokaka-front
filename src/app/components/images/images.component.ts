import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Image } from '../../model/Image';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  public isLogged;
  public isLoaded: boolean;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];

  constructor(private authService: AuthService,
    private imageService: ImageService,
    public toastManager: ToastsManager,
    private router: Router) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();

    this.imageService.getAll()
      .then((images: Image[]) => {
        this.galleryImages = images.map(image => (
          { small: image.url,
            medium: image.url,
            big: image.url,
            description: image.description
          }));
        this.isLoaded = true;
      })
      .catch((error) => {
        this.toastManager.error(error);
        this.isLoaded = true;
      });

      this.galleryOptions = [
        {
          imageSize: NgxGalleryImageSize.Contain,
          thumbnailsColumns: 4,
          thumbnailsRows: 2,
          thumbnailsPercent: 40,
          width: '80%',
          height: '800px',
          imageAnimation: NgxGalleryAnimation.Slide,
          previewCloseOnEsc: true,
          previewCloseOnClick: true,
          previewKeyboardNavigation: true,
          imageDescription: true,
        },
        // max-width 800
        {
          breakpoint: 800,
          width: '90%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        },
        // max-width 400
        {
          width: '90%',
          breakpoint: 400
        }
    ];

  }
}
