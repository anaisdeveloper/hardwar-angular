import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { PageProducts } from '../models/page-products';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  headers : HttpHeaders = new HttpHeaders();
  

  constructor(private http: HttpClient, 
    private authentication: AuthenticationService) {

      this.headers = new HttpHeaders({ Authorization: this.authentication.jwt });
    
   }


/*********************************************************************
 *                          GET ALL PRODUCTS
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
   getAllProducts(): Observable<any>{
     let url : string = 'https://hardwareboutique.herokuapp.com/products';
  
    return of(this.http.get(url));//(this.products);//;
   }

   /**
    ** /*********************************************************************
 *                         GET LIST OF PRODUCTS BY KEYWORD  
 * @param kw get pages of products from server
 * @param page 
 * @param size 
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
 

  getAllProductsByKeyword(kw: string, page:number, size: number): Observable<any>{
    
    let url : string = 'https://hardwareboutique.herokuapp.com/products?kw=' + kw + '&size=' + size+ '&page=' + page;

    
    return this.http.get(url);
   
    }



   /**
    ** /*********************************************************************
 *                         GET LIST OF PRODUCTS BY KEYWORD  
 * @param ID
 * 
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
   getProductsOfCategory(cat_id:string):Observable<any>{
    const url :string = "https://hardwareboutique.herokuapp.com/productofcategory?id=" + cat_id;
    
    return  (this.http.get(url));
  }
/**
    ** /*********************************************************************
 *                         GET PAGES OF PRODUCTS OF CATEGORY 
 * @param cat_id 
 * @param page 
 * @param size 
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */

  

  getPagesOfProductsOfCategory(cat_id : string, page:number, size: number): Observable<any>{
   
 
    let url : string = 'https://hardwareboutique.herokuapp.com/productofcategory?id=' + cat_id + '&page=' + page+ '&size=' + size;
  
  
    return this.http.get(url);
   
    }



    /**
    ** /*********************************************************************
 *  ******************** GET PAGES OF PRODUCTS OF CATEGORY BY KEYWORD
 * @param keyword                
 * @param cat_id 
 * @param page 
 * @param size 
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */

    

  getPagesOfProductsOfCategoryByKw(cat_id : string, keyword: string, page:number, size: number): Observable<any>{
  
    let url : string = 'https://hardwareboutique.herokuapp.com/productofcategorybykeyword?id=' + cat_id + 'keyword=' + keyword+ '&page=' + page + '&size='+ size;
    console.log("service");
    return this.http.get(url);
   
    }

    public getProductById(id: string){
     
  
      const url : string = "https://hardwareboutique.herokuapp.com/products/" + id;
      return this.http.get(url);
    }
    /**
  /**
** /*********************************************************************
 *  ******************** CREATE PRODUCT
 *            
 * *************************************************
 * ************************************
 * *****************************************************
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */

createNewProduct(id: string, product: Product){
 //id of category
 
  //const url : string = "https://hardwareboutique.herokuapp.com/products/" + id;
  const url : string = "https://hardwareboutique.herokuapp.com/products?cat_id=" + id;
  return this.http.post(url,  product, {headers: this.headers});
}


/**
  /**
** /*********************************************************************
 *  ******************** DELETE PRODUCT
 *            
 * *************************************************
 * ************************************
 * *****************************************************
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
    public deleteProduct(id: any){
     
      let url : string = 'https://hardwareboutique.herokuapp.com/products/'  +id;
     
      return this.http.delete(url, {'headers':this.headers} );
    }
/*********************************************************************
 *                           UPDATE   PRODUCT
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */

    updateProduct(product) {
     
      let url : string = 'https://hardwareboutique.herokuapp.com/products/'  +product.id;
      return this.http.put(url, product,{'headers':this.headers});
      
    }

    /*********************************************************************
 *                          SET PROMOTION OF   PRODUCT
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */

  public setPromotionOfProduct(product) {
  
  
  let url : string = 'https://hardwareboutique.herokuapp.com/product/'  +product.id;
  return this.http.put(url, product,{'headers':this.headers});
  
}
    

  
    
}
