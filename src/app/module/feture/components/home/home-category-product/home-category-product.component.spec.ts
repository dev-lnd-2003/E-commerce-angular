import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoryProductComponent } from './home-category-product.component';

describe('HomeCategoryProductComponent', () => {
  let component: HomeCategoryProductComponent;
  let fixture: ComponentFixture<HomeCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCategoryProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
