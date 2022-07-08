import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualComponentComponent } from './previsual-component.component';

describe('PrevisualComponentComponent', () => {
  let component: PrevisualComponentComponent;
  let fixture: ComponentFixture<PrevisualComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevisualComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisualComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
