import { Component, OnInit, Input } from '@angular/core';
import { WeatherReport } from '../../model/WeatherReport';
import { WeatherReportService } from '../../services/weather-report.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-weather-report-preview',
  templateUrl: './weather-report-preview.component.html',
  styleUrls: ['./weather-report-preview.component.css']
})
export class WeatherReportPreviewComponent implements OnInit {

  @Input()
  public weatherReport: WeatherReport;
  public isLogged: boolean;

  constructor(private toastManager: ToastsManager, private authService: AuthService, private weatherReportService: WeatherReportService, private router: Router) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
  }

  public delete() {
    this.weatherReportService.delete(this.weatherReport.id)
      .then(success => {
        this.toastManager.success("Успешно избрисана временска прогноза.");
        this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/weather_report']));
      })
      .catch(error => {
        alert(error);
      })
  }

  public update() {
    this.router.navigate(['/edit_weather_report/' + this.weatherReport.id]);
  }
}
