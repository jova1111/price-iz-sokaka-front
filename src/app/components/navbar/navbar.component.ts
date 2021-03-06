import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ AuthService ]
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
  }

}
