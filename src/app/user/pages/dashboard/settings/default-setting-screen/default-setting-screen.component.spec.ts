import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSettingScreenComponent } from './default-setting-screen.component';

describe('DefaultSettingScreenComponent', () => {
  let component: DefaultSettingScreenComponent;
  let fixture: ComponentFixture<DefaultSettingScreenComponent>;

  beforeEach(async(() => {
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
