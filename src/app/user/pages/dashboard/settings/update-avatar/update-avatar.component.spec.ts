import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateAvatarComponent } from './update-avatar.component';

describe('UpdateAvatarComponent', () => {
  let component: UpdateAvatarComponent;
  let fixture: ComponentFixture<UpdateAvatarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
