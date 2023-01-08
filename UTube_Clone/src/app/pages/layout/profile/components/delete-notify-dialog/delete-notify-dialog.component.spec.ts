import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNotifyDialogComponent } from './delete-notify-dialog.component';

describe('DeleteNotifyDialogComponent', () => {
  let component: DeleteNotifyDialogComponent;
  let fixture: ComponentFixture<DeleteNotifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNotifyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteNotifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
