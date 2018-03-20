import { Component, OnInit } from '@angular/core';
import { WeatherReport } from '../../model/WeatherReport';
import { WeatherReportService } from '../../services/weather-report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-weather-report-form',
  templateUrl: './weather-report-form.component.html',
  styleUrls: ['./weather-report-form.component.css']
})
export class WeatherReportFormComponent implements OnInit {

  public weatherReport = new WeatherReport("");
  public error: string;
  public editMode: boolean;
  private id: number;
  public isLoaded: boolean;

  constructor(private toastManager: ToastsManager, private weatherReportService: WeatherReportService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params["id"]) {
        this.id = +params["id"];
        this.editMode = true;
        this.weatherReportService.getById(this.id)
          .then(news => {
            this.weatherReport = new WeatherReport(news);
            this.isLoaded = true;
          })
          .catch(error => {
            console.log("error");
            this.isLoaded = true;
          });
      } else {
        this.isLoaded = true;
      }
    });
  }

  public onSubmit() {
      if(!this.editMode) {
      this.weatherReportService.save(this.weatherReport)
        .then(succes => {
          this.toastManager.success("Успешно додата временска прогноза.");
          this.router.navigate(['/weather_report']);
        })
        .catch(error => {
          this.toastManager.error("Дошло је до грешке приликом додавања.");
        });
      } else {
        this.weatherReportService.update(this.id, this.weatherReport)
          .then(success => {
            this.toastManager.success("Успешно измењена временска прогноза.");
            this.router.navigate(['/weather_report']);
          })
          .catch(error => {
            this.toastManager.error("Дошло је до грешке приликом измене");
          })
      }
  }

}
