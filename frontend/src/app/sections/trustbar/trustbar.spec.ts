import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trustbar } from './trustbar';

describe('Trustbar', () => {
  let component: Trustbar;
  let fixture: ComponentFixture<Trustbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trustbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Trustbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
