import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { FormGroup, FormControl } from "@angular/forms";  
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { error } from '@angular/compiler/src/util';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { PageProducts } from '../models/page-products';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[];
  
  currentPage: number = 0;
  size: number = 7;
  totalOfPages = 0;
  pagesArray: Array<Number>= [];
  pages: Array<Number>= [];
  hasError : boolean = true;
  errorMessage : string = '';
  cat_id : string = '';
  currenteCategory : any;
  nameOfCategory : string = "";
  currentProduct : Product;
  keyword: string = '';
 
 

  productSearchForm : FormGroup =  new FormGroup({
   
    keyword: new FormControl('')
    
  });

  constructor(private productService: ProductsService,
    private authenticationService: AuthenticationService,
    private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { 
          if (this.activatedRoute.snapshot.params['id'] != null) {
            let id = this.activatedRoute.snapshot.params['id'];
          this.cat_id = this.activatedRoute.snapshot.params['id'];
        
          this.currenteCategory = this.getCategoryById(this.cat_id);

          this.getPageProducts();
       
    
    
      
    }
     
      
    }

  ngOnInit(): void {

    this.productSearchForm = new FormGroup({
    
     
      keyword : new FormControl('')
      
    });
   
    
    
    
  }
  getPageProducts() {
    
    this.productService.getPagesOfProductsOfCategory(
      this.cat_id, 
      this.currentPage, this.size)
      .subscribe({
        next: (data: any)=>{
         
          this.products = data.content;
          
          this.totalOfPages = data.totalPages;
          this.pagesArray = new Array(this.totalOfPages);
          this.currentPage = data.number;
          
        }, error: (err)=>{
        
          this.errorMessage = err;
          
        }
      })
  }

  getListProducts(){
    this.productService.getAllProducts()
    .subscribe({
      next: (data)=>{
        
        this.products = data;
      }, error: (err)=>{
       
        this.errorMessage = err;
        
      }
    })
  }



   /**
   * 
   * @param i go to page i
   */

  goToPage(i: number){
    this.currentPage = i;
    this.getPageProducts();
  }



  //not yet
  searchProduct(){
    console.log("hello");
    //this.getPageProducts();
    this.getPageOfProductsPerCategoryByKeyword();
     
     
   }


/*********************************************************************
 * CREATE NEW PRODUCT
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
    public onSaveNewProduct(){
      
      this.router.navigate(['createProduct', this.cat_id]);
    }

/*********************************************************************
 *                 GET CATEGORY BY ID
 * ****       HIS NAME IS USED IN HTML
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
    getCategoryById(id: string){
      this.categoryService.getCategoryByIdFromServer(id)
      .subscribe({
        next: (data)=>{
          
          this.currenteCategory= data;
         this.nameOfCategory = this.currenteCategory.name;
        }, error: err => this.errorMessage = err
      })
    }

  /*********************************************************************
 *                           DELETE   PRODUCT
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
      public deleteProduct(p){
        if (confirm('Are sure you want to remove this product')) {
          this.productService.deleteProduct(p.id)
          .subscribe({
            next: (data)=>{
              
              this.getPageProducts();
  
            }, error: err => this.errorMessage = err,
          })
        }
       
      }
 /*********************************************************************
 *                           UPDATE   PRODUCT
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
      public onUpdateProduct(p){
        
        this.router.navigate(['updateProduct', this.cat_id, p.id]);
       

      }
    /****************************************************************
   * methodes locals
   * **************************************************************
   * ***************************************************************
   * ***************************************************************
   */

   /*********************************************************************
 *                          SET PROMOTION OF   PRODUCT
 * ********************************************************************
 * ********************************************************************
 * ********************************************************************
 */
public onSetPromotionOfProduct(p){
  
  let isPromo = p.promotion;
  this.productService.setPromotionOfProduct(p)
  .subscribe({
    next: (data)=>{
   
      
    }, error: (err)=> {
      this.errorMessage = err;
      
    }
  })

 

}

  




  isAdmin(){
    return this.authenticationService.isAdmin();
  }


  isUser(){
    return this.authenticationService.isUser();
  }
  isAuthenticated(){
    return this.authenticationService.isAuthenticated();
  }

  

  /*********************************************************************
 *                          GET PAGES OF PRODUCTS 
 *                      PER CATEGORY BY KEYWORD
 * ********************************************************************
 * ********************************************************************
 */
    public getPageOfProductsPerCategoryByKeyword(){
      console.log("hello 2222222");
            this.productService.getPagesOfProductsOfCategoryByKw(
              this.cat_id,
              this.keyword,
              this.currentPage, 
              this.size)
              .subscribe({
                next: (data: any)=>{
                  console.log("hello 7777");
                  this.products = data.content;
                  console.log('data   ' + this.products);
                  this.totalOfPages = data.totalPages;
                  this.pagesArray = new Array(this.totalOfPages);
                  this.currentPage = data.number;
                  
                }, error: (err)=>{
                  console.log('catch  ' + err);
                  this.errorMessage = err;
                  
                }
              }) 

            
      
    

      }

}
