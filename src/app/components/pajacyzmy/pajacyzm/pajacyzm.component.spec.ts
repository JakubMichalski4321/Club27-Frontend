import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PajacyzmComponent } from './pajacyzm.component';

describe('PajacyzmComponent', () => {
  let component: PajacyzmComponent;
  let fixture: ComponentFixture<PajacyzmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PajacyzmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PajacyzmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
