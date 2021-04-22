import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import '@tensorflow/tfjs-backend-webgl';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-image-classification',
  templateUrl: './image-classification.component.html',
  styleUrls: ['./image-classification.component.css'],
})
export class ImageClassificationComponent implements AfterContentInit {
  stream: MediaStream | undefined;
  model: mobilenet.MobileNet | undefined;
  @ViewChild('webcamVideo')
  webcamVideo!: ElementRef<HTMLVideoElement>;
  predictions: any;
  webcamTf: any;
  topHistoryPredictions: any;
  minProb: any;

  constructor() {}

  async ngAfterContentInit() {
    this.topHistoryPredictions = [];
    this.minProb = 1;
    this.initWebCam();
  }

  //Todo refactor
  async initWebCam() {
    if (!navigator.mediaDevices && !navigator.mediaDevices!.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      );
    }
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: 800,
        height: 800,
      },
    });
    this.webcamVideo.nativeElement.srcObject = this.stream;

    this.webcamVideo.nativeElement.onloadedmetadata = async () => {
      this.webcamVideo.nativeElement.play();
      this.model = await mobilenet.load();

      this.webcamTf = await tf.data.webcam(this.webcamVideo.nativeElement);
      while (true) {
        const img = await this.webcamTf.capture();
        this.predictions = await this.model.classify(img);
        img.dispose();
        await tf.nextFrame();
        console.log(this.topHistoryPredictions.map((x: any) => x.probability));
        this.predictions.forEach(async (element: any) => {
          await this.addProb(element);
        });
      }
    };
  }

  //TODO: Refactor
  async addProb(selectedProb: any) {
    let index = this.topHistoryPredictions.findIndex(
      (x: any) => x.className == selectedProb.className
    );
    if (index != -1) {
      if (
        this.topHistoryPredictions[index].probability < selectedProb.probability
      ) {
        this.topHistoryPredictions[index].probability =
          selectedProb.probability;
        this.orderTopHistoryPredictions();
      }
      return;
    }
    if (this.topHistoryPredictions.length < 10) {
      this.topHistoryPredictions.push(selectedProb);
      if (this.minProb > selectedProb.probability) {
        this.minProb = selectedProb.probability;
      }
    } else {
      if (this.minProb < selectedProb.probability) {
        this.topHistoryPredictions.push(selectedProb);
        this.removeMinProbElement();
      }
    }
  }

  //TODO: Refactor
  removeMinProbElement() {
    let newArr: any[] = [];
    let newMin = 1;
    let remove = false;
    this.topHistoryPredictions.forEach((element: any) => {
      if (!(element.probability == this.minProb) || remove) {
        newArr.push(element);
        if (element.probability < newMin) {
          newMin = element.probability;
        }
      }
    });
    this.orderTopHistoryPredictions();
    //Encuentra el minimo del array
    this.minProb = newMin;
  }

  orderTopHistoryPredictions() {
    this.topHistoryPredictions = this.topHistoryPredictions.sort(function (
      a: any,
      b: any
    ) {
      return b.probability - a.probability;
    });
  }
}
