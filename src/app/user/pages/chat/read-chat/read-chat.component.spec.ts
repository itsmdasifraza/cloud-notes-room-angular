import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadChatComponent } from './read-chat.component';

describe('ReadChatComponent', () => {
  let component: ReadChatComponent;
  let fixture: ComponentFixture<ReadChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
