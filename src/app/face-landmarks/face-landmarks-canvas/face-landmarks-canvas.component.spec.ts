import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceLandmarksCanvasComponent } from './face-landmarks-canvas.component';

describe('FaceLandmarksCanvasComponent', () => {
  let component: FaceLandmarksCanvasComponent;
  let fixture: ComponentFixture<FaceLandmarksCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceLandmarksCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceLandmarksCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
