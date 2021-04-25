import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandposeComponent } from './handpose.component';

describe('HandposeComponent', () => {
  let component: HandposeComponent;
  let fixture: ComponentFixture<HandposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
