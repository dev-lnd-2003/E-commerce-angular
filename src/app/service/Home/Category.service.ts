import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "https://ecommerce-azure.azurewebsites.net/api/public/category/"
  constructor(private httpService: HttpClient) { }

  findAll(): Observable<Category[]> {
    return this.httpService.get<Category[]>(this.url + "findAll");
  }

}
