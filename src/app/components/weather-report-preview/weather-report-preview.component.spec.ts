import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherReportPreviewComponent } from './weather-report-preview.component';

describe('WeatherReportPreviewComponent', () => {
  let component: WeatherReportPreviewComponent;
  let fixture: ComponentFixture<WeatherReportPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherReportPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherReportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
