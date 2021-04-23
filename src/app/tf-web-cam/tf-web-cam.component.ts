import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { TfWebCamService } from './tf-web-cam.service';
@Component({
  selector: 'app-tf-web-cam',
  templateUrl: './tf-web-cam.component.html',
  styleUrls: ['./tf-web-cam.component.css'],
})
export class TfWebCamComponent implements AfterContentInit {
  @ViewChild('webcamVideo') webcamVideo!: ElementRef<HTMLVideoElement>;
  tfWebCam: any;
  stream: MediaStream | undefined;

  constructor(private webcamService: TfWebCamService) {}

  async ngAfterContentInit() {
    this.initWebCam();
  }

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
      this.webcamService.setWebcam(this.webcamVideo);
    };
  }
}
