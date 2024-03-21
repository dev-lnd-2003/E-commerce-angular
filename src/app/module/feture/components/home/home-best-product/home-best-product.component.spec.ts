import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBestProductComponent } from './home-best-product.component';

describe('HomeBestProductComponent', () => {
  let component: HomeBestProductComponent;
  let fixture: ComponentFixture<HomeBestProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBestProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBestProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
