import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FthreadReactionComponent } from './fthread-reaction.component';

describe('FthreadReactionComponent', () => {
  let component: FthreadReactionComponent;
  let fixture: ComponentFixture<FthreadReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FthreadReactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FthreadReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
