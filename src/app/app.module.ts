import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageClassificationComponent } from './image-classification/image-classification.component';
import { TfWebCamComponent } from './tf-web-cam/tf-web-cam.component';
import { HandposeComponent } from './handpose/handpose.component';
import { HandposeCanvasComponent } from './handpose/handpose-canvas/handpose-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageClassificationComponent,
    TfWebCamComponent,
    HandposeComponent,
    HandposeCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
