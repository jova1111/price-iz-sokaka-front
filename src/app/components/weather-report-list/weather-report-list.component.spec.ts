import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherReportListComponent } from './weather-report-list.component';

describe('WeatherReportListComponent', () => {
  let component: WeatherReportListComponent;
  let fixture: ComponentFixture<WeatherReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
