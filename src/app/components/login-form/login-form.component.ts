import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { AuthService } from '../../services/auth.service'
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [ AuthService ]
})
export class LoginFormComponent implements OnInit {

  public user: User = new User();
  public error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.user)
      .then(() => {
        this.router.navigate(['/']);
        //window.location.reload(true)
      })
      .catch(
        error => {
          this.error = error;
      });
  }

}
