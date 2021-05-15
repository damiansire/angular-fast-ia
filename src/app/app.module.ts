import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageClassificationComponent } from './image-classification/image-classification.component';
import { TfWebCamComponent } from './tf-web-cam/tf-web-cam.component';
import { HandposeComponent } from './handpose/handpose.component';
import { HandposeCanvasComponent } from './handpose/handpose-canvas/handpose-canvas.component';
import { FaceLandmarksComponent } from './face-landmarks/face-landmarks.component';
import { FaceLandmarksCanvasComponent } from './face-landmarks/face-landmarks-canvas/face-landmarks-canvas.component';
import { KnnClassifierComponent } from './knn-classifier/knn-classifier.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageClassificationComponent,
    TfWebCamComponent,
    HandposeComponent,
    HandposeCanvasComponent,
    FaceLandmarksComponent,
    FaceLandmarksCanvasComponent,
    KnnClassifierComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
