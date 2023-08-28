import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrComponentComponent } from './qr-component.component';

describe('QrComponentComponent', () => {
  let component: QrComponentComponent;
  let fixture: ComponentFixture<QrComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
