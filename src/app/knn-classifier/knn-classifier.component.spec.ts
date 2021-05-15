import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnnClassifierComponent } from './knn-classifier.component';

describe('KnnClassifierComponent', () => {
  let component: KnnClassifierComponent;
  let fixture: ComponentFixture<KnnClassifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnnClassifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnnClassifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
