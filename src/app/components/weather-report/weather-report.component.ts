import { Component, OnInit } from '@angular/core';
import { WeatherReport } from '../../model/WeatherReport';
import { WeatherReportService } from '../../services/weather-report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {

  public isLoaded: boolean;
  public isLogged: boolean;
  private id: number;
  public weatherReport: WeatherReport;

  constructor(private weatherReportService: WeatherReportService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.weatherReportService.getById(this.id)
      .then(success => {
        this.weatherReport = new WeatherReport(success);
        this.isLoaded = true;
      })
      .catch(error => {
        console.log(error);
      })

    this.isLogged = this.authService.isAuthenticated();
  }

  public delete() {
    this.weatherReportService.delete(this.id)
      .then(success => {
        alert(success);
        this.router.navigate(['/weather_report']);
        window.location.reload(true);
      })
      .catch(error => {
        alert(error);
      })
  }

  public update() {
    this.router.navigate(['/edit_weather_report/' + this.id]);
  }

}
