import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as mobilenet from '@tensorflow-models/mobilenet';
import { TfWebCamService } from '../tf-web-cam/tf-web-cam.service';

@Component({
  selector: 'app-image-classification',
  templateUrl: './image-classification.component.html',
  styleUrls: ['./image-classification.component.css'],
})
export class ImageClassificationComponent implements AfterContentInit {
  model: mobilenet.MobileNet | undefined;
  predictions: any;
  topHistoryPredictions: any;
  minProb: any;

  constructor(private webcamService: TfWebCamService) {}

  async ngAfterContentInit() {
    this.topHistoryPredictions = [];
    this.minProb = 1;
    this.model = await mobilenet.load();
    setTimeout(async () => {
      let prueba = this.webcamService.getCamObservable();
      prueba.subscribe(async (frame: any) => {
        this.predictions = await this.model?.classify(frame);
        this.predictions.forEach(async (element: any) => {
          await this.addProb(element);
        });
      });
    }, 2000);
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
