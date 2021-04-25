import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandposeCanvasComponent } from './handpose-canvas.component';

describe('HandposeCanvasComponent', () => {
  let component: HandposeCanvasComponent;
  let fixture: ComponentFixture<HandposeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandposeCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandposeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
