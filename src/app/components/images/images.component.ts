import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public toastManager: ToastsManager,
    private router: Router) { }

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
        const image = new Image('');
        image.url = 'https://cdn.filestackcontent.com/6Z6AYx4kQOaGCrJ8Fcc4';
        image.description = 'Jova becar.';
        this.images.push(image);
      });
  }

  public delete(id) {
    if (!confirm('Да ли сте сигурни да хоћете да избришете слику?')) {
      return;
    }
    this.isLoaded = false;
    this.imageService.delete(id)
      .then(success => {
        this.toastManager.success('Успешно сте избрисали слику.');
        this.images = this.images.filter(image => image.id !== id);
        this.isLoaded = true;
      })
      .catch(error => {
        this.toastManager.error(error);
        this.isLoaded = true;
      });
  }

  public update(id) {
    this.router.navigate(['/edit_image/' + id]);
  }
}
