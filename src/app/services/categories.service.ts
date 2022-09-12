import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Category } from '../models/category';
import { ProductsService } from './products.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  categories: Category[];
  constructor(private http: HttpClient,
    private authentication: AuthenticationService, 
    private productsService: ProductsService) {
    
    
  
   }

  /**
   * method get all categories from heroku
   */

   getAllCatgories():Observable<any>{
    const url : string = "https://hardwareboutique.herokuapp.com/categories";//"http://localhost:8080/categories";//
    
    return  this.http.get(url);//(this.categories);
   }


   /****
    * GET PAGES OF CATEGORIES
    */


   getPagesOfCatgories(page:number, size: number):Observable<any>{  
    const url : string = "https://hardwareboutique.herokuapp.com/categories?page=" + page+ "&size=" + size;//"http://localhost:8080/categories";//
    
    return  this.http.get(url);//(this.categories);
   }
/**
 * 
 * @param id Create new Category
 */
createNewCategory(cat){
  const headers = new HttpHeaders({ Authorization: this.authentication.jwt });
   console.log("this jwt " + this.authentication.jwt);
  const url : string = "https://hardwareboutique.herokuapp.com/categories";
  return this.http.post(url,  cat, {headers: headers});
}
/**
 * delete category
 */


deleteCategory(id: any) {
 
 const headers = new HttpHeaders({ Authorization: this.authentication.jwt });
  

  const url : string = "https://hardwareboutique.herokuapp.com/categories/" +id;
  return this.http.delete(url, {headers: headers});
}


/**
 * get category By Id
 */


getCategoryByIdFromServer(id: string){
  const headers = new HttpHeaders({ Authorization: this.authentication.jwt });
  
  const url : string = "https://hardwareboutique.herokuapp.com/categories/" +id;
  
  
  
  return this.http.get(url, {'headers':headers});
 }


 updateCategory(category: Category){


  const headers = new HttpHeaders({ Authorization: this.authentication.jwt });
  
  const url : string ="https://hardwareboutique.herokuapp.com/categories/" +category.id;
  return this.http.put(url, category,{'headers':headers});
 }

   






  
}
