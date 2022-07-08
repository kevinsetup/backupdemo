import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraComponentComponent } from './camera-component.component';

describe('CameraComponentComponent', () => {
  let component: CameraComponentComponent;
  let fixture: ComponentFixture<CameraComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
