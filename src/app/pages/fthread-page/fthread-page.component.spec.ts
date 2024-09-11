import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FthreadPageComponent } from './fthread-page.component';

describe('FthreadPageComponent', () => {
  let component: FthreadPageComponent;
  let fixture: ComponentFixture<FthreadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FthreadPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FthreadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
