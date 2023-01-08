import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubDialogComponent } from './unsub-dialog.component';

describe('UnsubDialogComponent', () => {
  let component: UnsubDialogComponent;
  let fixture: ComponentFixture<UnsubDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsubDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
