import { ElementRef, Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TfWebCamService {
  tfWebCam: any;
  frameObs: any;
  actualFrame: any;
  constructor() {}

  async setWebcam(webcamVideo: ElementRef<HTMLVideoElement>) {
    this.tfWebCam = await tf.data.webcam(webcamVideo.nativeElement);
    this.frameObs = new Subject();
    while (true) {
      const frame = await this.tfWebCam.capture();
      this.frameObs.next(frame);
      frame.dispose();
      await tf.nextFrame();
    }
  }

  getCamObservable() {
    return this.frameObs;
  }
}
