import { AfterContentInit, Component, OnInit } from '@angular/core';

import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import { TfWebCamService } from '../tf-web-cam/tf-web-cam.service';

@Component({
  selector: 'app-handpose',
  templateUrl: './handpose.component.html',
  styleUrls: ['./handpose.component.css'],
})
export class HandposeComponent implements AfterContentInit {
  model: handpose.HandPose | undefined;
  prediction: any;
  keypoints: any[] | undefined;

  constructor(private webcamService: TfWebCamService) {}

  async ngAfterContentInit() {
    this.model = await handpose.load();
    setTimeout(async () => {
      let prueba = this.webcamService.getCamObservable();
      prueba.subscribe(async (frame: any) => {
        this.prediction = await this.model?.estimateHands(frame);
        this.keypoints = this.prediction[0]?.landmarks;
        frame.dispose();
      });
    }, 2000);
  }
}
