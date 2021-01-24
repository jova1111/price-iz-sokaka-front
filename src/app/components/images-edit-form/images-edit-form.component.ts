import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Image } from '../../model/Image';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-images-edit-form',
  templateUrl: './images-edit-form.component.html',
  styleUrls: ['./images-edit-form.component.css']
})
export class ImagesEditFormComponent implements OnInit {

  public isLogged;
  public image: Image;
  public isLoaded: boolean;
  public id: number;

  constructor(private authService: AuthService,
    private imageService: ImageService,
    public toastManager: ToastsManager,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.isLoaded = false;
    this.isLogged = this.authService.isAuthenticated();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.imageService.getById(this.id)
          .then((image: Image) => {
            this.image = image;
            this.isLoaded = true;
          })
          .catch(error => {
            this.isLoaded = true;
            this.toastManager.error(error);
          });
      } else {
        this.isLoaded = true;
      }
    });
  }

  public onSubmit() {
    this.isLoaded = false;
    this.imageService.update(this.id, this.image)
      .then(success => {
        this.toastManager.success('Успешно изменио слику!');
        this.router.navigate(['/images']);
      })
      .catch(error => {
        this.toastManager.error('Дошло је до грешке приликом измене.');
        this.isLoaded = true;
      });
  }
}
