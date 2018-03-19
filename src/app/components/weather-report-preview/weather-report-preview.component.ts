import { Component, OnInit, Input } from '@angular/core';
import { WeatherReport } from '../../model/WeatherReport';

@Component({
  selector: 'app-weather-report-preview',
  templateUrl: './weather-report-preview.component.html',
  styleUrls: ['./weather-report-preview.component.css']
})
export class WeatherReportPreviewComponent implements OnInit {

  @Input()
  public weatherReport: WeatherReport;

  constructor() { }

  ngOnInit() {
  }

}
