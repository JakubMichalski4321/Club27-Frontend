import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundboardOneComponent } from './soundboard-one.component';

describe('SoundboardOneComponent', () => {
  let component: SoundboardOneComponent;
  let fixture: ComponentFixture<SoundboardOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundboardOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundboardOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
