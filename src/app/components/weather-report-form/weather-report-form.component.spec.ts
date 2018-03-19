import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherReportFormComponent } from './weather-report-form.component';

describe('WeatherReportFormComponent', () => {
  let component: WeatherReportFormComponent;
  let fixture: ComponentFixture<WeatherReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
