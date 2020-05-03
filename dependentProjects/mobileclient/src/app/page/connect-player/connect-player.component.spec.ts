import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectPlayerComponent } from './connect-player.component';

describe('LoginComponent', () => {
  let component: ConnectPlayerComponent;
  let fixture: ComponentFixture<ConnectPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
