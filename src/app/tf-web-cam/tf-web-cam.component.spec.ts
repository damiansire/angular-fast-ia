import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfWebCamComponent } from './tf-web-cam.component';

describe('TfWebCamComponent', () => {
  let component: TfWebCamComponent;
  let fixture: ComponentFixture<TfWebCamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfWebCamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TfWebCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
