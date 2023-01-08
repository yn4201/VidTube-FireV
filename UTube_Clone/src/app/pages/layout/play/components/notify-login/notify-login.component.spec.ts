import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyLoginComponent } from './notify-login.component';

describe('NotifyLoginComponent', () => {
  let component: NotifyLoginComponent;
  let fixture: ComponentFixture<NotifyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
