import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReactionComponent } from './post-reaction.component';

describe('PostReactionComponent', () => {
  let component: PostReactionComponent;
  let fixture: ComponentFixture<PostReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostReactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
