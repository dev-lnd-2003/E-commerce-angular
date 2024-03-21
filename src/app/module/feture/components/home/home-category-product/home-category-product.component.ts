import { Category } from 'src/app/model/Category';
import { CategoryService } from './../../../../../service/Home/Category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-category-product',
  templateUrl: './home-category-product.component.html',
  styleUrls: ['./home-category-product.component.css']
})
export class HomeCategoryProductComponent implements OnInit {

  category: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.categoryService.findAll().subscribe(response => {
      this.category = response
    }, (error) => {
      console.log(error);
    })
  }

}
