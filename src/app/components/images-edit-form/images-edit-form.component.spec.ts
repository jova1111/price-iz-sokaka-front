import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesEditFormComponent } from './images-edit-form.component';

describe('ImagesEditFormComponent', () => {
  let component: ImagesEditFormComponent;
  let fixture: ComponentFixture<ImagesEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
