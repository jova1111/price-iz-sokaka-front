import { Component, OnInit } from '@angular/core';
import { WeatherReport } from '../../model/WeatherReport';
import { WeatherReportService } from '../../services/weather-report.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private weatherReportService: WeatherReportService, private router: Router, private route: ActivatedRoute) { }

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
          this.router.navigate(['/weather_report']);
          window.location.reload();
        })
        .catch(error => console.log(error));
      } else {
        this.weatherReportService.update(this.id, this.weatherReport)
          .then(success => {
            alert("Успешно апдејтово.");
            this.router.navigate(['/weather_report']);
            window.location.reload();
          })
          .catch(error => {
            alert("Дошло је до грешке приликом апдејтовања.");
          })
      }
  }

}
