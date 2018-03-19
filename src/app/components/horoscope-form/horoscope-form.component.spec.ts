import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopeFormComponent } from './horoscope-form.component';

describe('HoroscopeFormComponent', () => {
  let component: HoroscopeFormComponent;
  let fixture: ComponentFixture<HoroscopeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoroscopeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoroscopeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
