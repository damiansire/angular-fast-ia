import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceLandmarksComponent } from './face-landmarks.component';

describe('FaceLandmarksComponent', () => {
  let component: FaceLandmarksComponent;
  let fixture: ComponentFixture<FaceLandmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceLandmarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceLandmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
