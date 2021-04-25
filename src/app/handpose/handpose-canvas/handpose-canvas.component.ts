import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-handpose-canvas',
  templateUrl: './handpose-canvas.component.html',
  styleUrls: ['./handpose-canvas.component.css'],
})
export class HandposeCanvasComponent implements AfterViewInit {
  @ViewChild('handposeCanvas') handposeCanvas!: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | undefined | null;
  @Input() fingers: any[] | undefined;

  fingerLookupIndices = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };
  constructor() {}

  ngAfterViewInit(): void {
    this.context = this.handposeCanvas?.nativeElement.getContext('2d');
  }
  ngOnChanges() {
    // create header using child_id
    console.log(this.fingers);
    this.drawFrameLandmarks(this.fingers);
  }

  drawPoint(y: any, x: any, r: any) {
    this.context?.beginPath();
    this.context?.arc(x * 2.5, y, r, 0, 2 * Math.PI);
    this.context?.fill();
  }

  drawKeypoints(keypoints: any) {
    const keypointsArray = keypoints;

    for (let i = 0; i < keypointsArray.length; i++) {
      const y = keypointsArray[i][0];
      const x = keypointsArray[i][1];
      this.drawPoint(x - 2, y - 2, 3);
    }
  }

  drawPath(points: any, closePath: any) {
    const region = new Path2D();
    region.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point[0], point[1]);
    }

    if (closePath) {
      region.closePath();
    }
    this.context?.stroke(region);
  }

  async drawFrameLandmarks(fingers: any[] | undefined) {
    if (fingers != undefined) {
      this.drawKeypoints(fingers);
    }
  }
}
