import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurenotesDialog } from './securenotes-dialog.component';

describe('SecurenotesDialog', () => {
  let component: SecurenotesDialog;
  let fixture: ComponentFixture<SecurenotesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurenotesDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurenotesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
