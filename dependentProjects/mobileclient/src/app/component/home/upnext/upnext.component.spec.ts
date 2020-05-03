import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpnextComponent } from './upnext.component';

describe('UpnextComponent', () => {
  let component: UpnextComponent;
  let fixture: ComponentFixture<UpnextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpnextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpnextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
