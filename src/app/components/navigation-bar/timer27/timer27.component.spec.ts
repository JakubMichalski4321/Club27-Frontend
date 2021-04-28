import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Timer27Component } from './timer27.component';

describe('Timer27Component', () => {
  let component: Timer27Component;
  let fixture: ComponentFixture<Timer27Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Timer27Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Timer27Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
