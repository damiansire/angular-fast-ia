import { AfterContentInit, Component, OnInit } from '@angular/core';

import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs';
import { TfWebCamService } from '../tf-web-cam/tf-web-cam.service';
@Component({
  selector: 'app-face-landmarks',
  templateUrl: './face-landmarks.component.html',
  styleUrls: ['./face-landmarks.component.css'],
})
export class FaceLandmarksComponent implements AfterContentInit {
  model: blazeface.BlazeFaceModel | undefined;
  prediction: any;
  keypoints: any[] | undefined;

  constructor(private webcamService: TfWebCamService) {}

  async ngAfterContentInit() {
    this.model = await blazeface.load();
    setTimeout(async () => {
      let prueba = this.webcamService.getCamObservable();
      prueba.subscribe(async (frame: any) => {
        this.prediction = await this.model?.estimateFaces(
          frame,
          false,
          true,
          true
        );
        this.keypoints = this.prediction[0]?.landmarks;
        console.log(this.prediction);
        frame.dispose();
      });
    }, 2000);
  }
}
