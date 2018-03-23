import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  public isLogged;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
  }

}
