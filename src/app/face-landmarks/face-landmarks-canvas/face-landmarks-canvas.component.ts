import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-face-landmarks-canvas',
  templateUrl: './face-landmarks-canvas.component.html',
  styleUrls: ['./face-landmarks-canvas.component.css'],
})
export class FaceLandmarksCanvasComponent implements AfterViewInit {
  @ViewChild('faceCanvas') faceCanvas!: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | undefined;
  @Input() facePredictions: any[] | undefined;

  canvas = { width: 800, height: 800 };

  constructor() {}

  ngAfterViewInit(): void {
    this.context =
      this.faceCanvas?.nativeElement.getContext('2d') ||
      new CanvasRenderingContext2D();
  }
  ngOnChanges() {
    // create header using child_id
    this.drawFaceLandmarks();
  }

  drawFaceLandmarks = async () => {
    if (this.facePredictions != undefined && this.context != undefined) {
      if (this.facePredictions.length > 0) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.facePredictions.length; i++) {
          const start = this.facePredictions[i].topLeft;
          const end = this.facePredictions[i].bottomRight;
          const size = [end[0] - start[0], end[1] - start[1]];
          this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
          this.context.fillRect(start[0], start[1], size[0], size[1]);

          const landmarks = this.facePredictions[i].landmarks;

          this.context.fillStyle = 'blue';
          for (let j = 0; j < landmarks.length; j++) {
            const x = landmarks[j][0];
            const y = landmarks[j][1];
            this.context.fillRect(x, y, 5, 5);
          }
        }
      }
    }
  };
}
