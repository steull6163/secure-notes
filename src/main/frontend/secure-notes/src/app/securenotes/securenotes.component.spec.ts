import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurenotesComponent } from './securenotes.component';

describe('SecurenotesComponent', () => {
  let component: SecurenotesComponent;
  let fixture: ComponentFixture<SecurenotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurenotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
