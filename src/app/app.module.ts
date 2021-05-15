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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
