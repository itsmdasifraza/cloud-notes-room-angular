import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateDetailsComponent } from './update-details.component';

describe('UpdateDetailsComponent', () => {
  let component: UpdateDetailsComponent;
  let fixture: ComponentFixture<UpdateDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
