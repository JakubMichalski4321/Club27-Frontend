import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoundboardComponent } from './add-soundboard.component';

describe('AddSoundboardComponent', () => {
  let component: AddSoundboardComponent;
  let fixture: ComponentFixture<AddSoundboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AddSoundboardComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoundboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
