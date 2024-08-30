import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FthreadComponent } from './fthread.component';

describe('FthreadComponent', () => {
  let component: FthreadComponent;
  let fixture: ComponentFixture<FthreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FthreadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FthreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
