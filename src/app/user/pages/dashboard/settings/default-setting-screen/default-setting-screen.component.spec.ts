import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultSettingScreenComponent } from './default-setting-screen.component';

describe('DefaultSettingScreenComponent', () => {
  let component: DefaultSettingScreenComponent;
  let fixture: ComponentFixture<DefaultSettingScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultSettingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSettingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
