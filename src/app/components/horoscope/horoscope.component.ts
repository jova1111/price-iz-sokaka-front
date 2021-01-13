import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from '../../services/horoscope.service';
import { Horoscope } from '../../model/Horoscope';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-horoscope',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.css']
})
export class HoroscopeComponent implements OnInit {

  public horoscope: Horoscope;
  public isLoaded: boolean;
  public isLogged: boolean;

  constructor(private toastManager: ToastsManager,
     private horoscopeService: HoroscopeService,
      private authService: AuthService,
      private router: Router) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
    this.horoscopeService.getActive()
      .then(horoscopeJson => {
        this.horoscope = new Horoscope(horoscopeJson);
        this.isLoaded = true;
      })
      .catch(error => {
        alert(error);
      });
  }

  public delete() {
    this.horoscopeService.delete(this.horoscope.id)
      .then(success => {
        this.toastManager.success('Успешно избрисан хороскоп.');
        this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/horoscope']));
      })
      .catch(error => {
        this.toastManager.error('Дошло је до грешке приликом брисања хороскопа.');
      });
  }

  public update() {
    this.router.navigate(['/edit_horoscope/' + this.horoscope.id]);
  }
}
