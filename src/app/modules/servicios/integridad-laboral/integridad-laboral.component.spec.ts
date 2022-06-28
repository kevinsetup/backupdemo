import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegridadLaboralComponent } from './integridad-laboral.component';

describe('IntegridadLaboralComponent', () => {
  let component: IntegridadLaboralComponent;
  let fixture: ComponentFixture<IntegridadLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegridadLaboralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegridadLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
