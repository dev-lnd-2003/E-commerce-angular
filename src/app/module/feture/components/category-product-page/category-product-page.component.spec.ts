import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductPageComponent } from './category-product-page.component';

describe('CategoryProductPageComponent', () => {
  let component: CategoryProductPageComponent;
  let fixture: ComponentFixture<CategoryProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
