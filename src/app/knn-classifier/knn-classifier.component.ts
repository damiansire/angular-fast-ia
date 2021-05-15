import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { TfWebCamService } from '../tf-web-cam/tf-web-cam.service';
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

@Component({
  selector: 'app-knn-classifier',
  templateUrl: './knn-classifier.component.html',
  styleUrls: ['./knn-classifier.component.css'],
})
export class KnnClassifierComponent implements AfterViewChecked {
  model: mobilenetModule.MobileNet | undefined;
  prediction: any;
  keypoints: any[] | undefined;
  classifier: knnClassifier.KNNClassifier = knnClassifier.create();
  actualFrame: any;

  constructor(private webcamService: TfWebCamService) {
    mobilenetModule.load().then((model) => {
      this.model = model;
    });
  }

  async ngAfterViewChecked() {
    console.log(this.webcamService.getCamObservable());
    this.webcamService.getCamObservable().subscribe(async (frame: any) => {
      if (this.actualFrame) {
        this.actualFrame.dispose();
      }
      this.actualFrame = frame;
      if (this.classifier != null && this.classifier.getNumClasses() > 0) {
        console.log(this.classifier?.getNumClasses());
        this.prediction = await this.classifier?.predictClass(frame);
        console.log(this.prediction);
      }
    });
  }

  addClass(classNumber: any) {
    if (!this.actualFrame || !this.model) {
      return;
    }
    const logits1 = this.model.infer(this.actualFrame, true);
    this.classifier.addExample(logits1, classNumber);
  }
}
