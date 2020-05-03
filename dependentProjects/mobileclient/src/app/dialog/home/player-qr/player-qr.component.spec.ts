import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerQrComponent } from './player-qr.component';

describe('PlayerQrComponent', () => {
  let component: PlayerQrComponent;
  let fixture: ComponentFixture<PlayerQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
