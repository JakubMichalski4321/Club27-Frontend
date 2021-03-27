import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PajacyzmyComponent } from './pajacyzmy.component';

describe('PajacyzmyComponent', () => {
  let component: PajacyzmyComponent;
  let fixture: ComponentFixture<PajacyzmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PajacyzmyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PajacyzmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
