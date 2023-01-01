import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExplainationComponent } from './explaination.component';

describe('ExplainationComponent', () => {
  let component: ExplainationComponent;
  let fixture: ComponentFixture<ExplainationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplainationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplainationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
