import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugoComponent } from './jugo.component';

describe('JugoComponent', () => {
  let component: JugoComponent;
  let fixture: ComponentFixture<JugoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
