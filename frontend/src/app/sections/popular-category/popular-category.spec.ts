import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCategory } from './popular-category';

describe('PopularCategory', () => {
  let component: PopularCategory;
  let fixture: ComponentFixture<PopularCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCategory],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
