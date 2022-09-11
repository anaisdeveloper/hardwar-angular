import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  /****
   * 
   * DECLARATION
   * 
   */

    product : Product;
      cat_id : any;
      prod_id : any;
      nameOfCategory : string = "";
      currentcCategory : any;
      isCreateproduct : boolean = true;
    errorMessage : string = '';
    title: string = "Create new product";
    categoryForm: FormGroup =  new FormGroup({
      id: new FormControl(''),
    
      
      
    });
  productForm: FormGroup =  new FormGroup({
    
    name : new FormControl(''),
    price : new FormControl(''),
    promotion:new FormControl(''),
    category: this.categoryForm
    
    
  });
  

  
  constructor(private authenticationService: AuthenticationService,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private router : Router, private activatedRoute: ActivatedRoute) { 


      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          
          if (this.activatedRoute.snapshot.params['id2'] != null) {
          
          this.cat_id = this.activatedRoute.snapshot.params['id'];
          this.prod_id = this.activatedRoute.snapshot.params['id2'];
        this.getCategoryById(this.cat_id);
        this.getProductOfCategoryById(this.prod_id);
          this.isCreateproduct = false;
         this.categoryForm.patchValue({
          id : this.cat_id,
        });
        
        
          
        }
        }
      });
    }

  ngOnInit(): void {
    if (!this.isCreateproduct) {
      this.title = "Update  this product";
      
     
    } 

    
  }


  public onSubmit(){
    this.product = this.productForm.value;
    if (this.isCreateproduct) {
      
      this.saveNewProduct();
      
  } else {
    
    this.updateProduct();
    
   
  }
    
  this.isCreateproduct = true;
  this.router.navigateByUrl("/products/" + this.cat_id);
    
  }



  public saveNewProduct(){
   
    this.productService.createNewProduct(this.product)
    .subscribe({
      next: (data)=>{
      
        this.router.navigate(['products', this.cat_id]);
      }, error: err => this.errorMessage = err,
    })



  }

  public updateProduct(){
    
  
    this.product.id = this.prod_id;
    this.productService.updateProduct(this.product)
        .subscribe({
          next: (data)=>{
            

          }, error: err => this.errorMessage = err,
        })

  }


  public getProductOfCategoryById(id){
   
    this.productService.getProductById(id)
  .subscribe({
    next: data => {
    
      this.product  =  JSON.parse(JSON.stringify(data));
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        promotion: this.product.promotion
        
      });
     
    }, error: err => console.log(err)
  });
  }

  getCategoryById(id: string){
    this.categoriesService.getCategoryById(id)
    .subscribe({
      next: (data)=>{
        
        this.currentcCategory= data;
        this.nameOfCategory = this.currentcCategory.name;
      }, error: err => this.errorMessage = err
    })
  }

}
