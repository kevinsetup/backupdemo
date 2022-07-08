import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {

  HostListener,
  Inject,
  Input,

  QueryList,

  ViewChildren,
} from '@angular/core';
@Component({
  selector: 'app-camera-component',
  templateUrl: './camera-component.component.html',
  styleUrls: ['./camera-component.component.scss']
})
export class CameraComponentComponent implements AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<CameraComponentComponent>
  ) {
    
  }
  
  AfterViewInit(): void {}
  WIDTH = 738.6666666666666;
  HEIGHT = 554;
  onNoClick(): void {
    this.dialogRef.close();
  }
  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;
  closeData: string[];

  captures: string[] = [];
  error: any;
  isCaptured: boolean;

  async ngAfterViewInit() {
    await this.setupDevices();
  }
 
  stream: any;
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (this.stream) {
          this.video.nativeElement.srcObject = this.stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error =
            'No se pudo encontrar el dispositivo de la cámara, o no permitio el acceso a la cámara';
        }
      } catch (e) {
        this.error =
          'No se pudo encontrar el dispositivo de la cámara, o no permitio el acceso a la cámara';
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
    this.video.nativeElement.pause();
    this.stream.getVideoTracks()[0].stop();
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
}
