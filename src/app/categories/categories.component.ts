import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { AuthenticationService } from '../services/authentication.service';
import { isNumber } from 'util';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
/**
 * declaration of variables
 */
    categories : Category[];
    currentCategory: Category;
  errorMessage : string = '';
  currentPage: number = 0;
    size: number = 7;
    totalOfPages = 0;
    categoriesArray: Array<Number>= [];
    pages: Array<Number>= [];
    keyword: string = " ";
    categoriesSearchForm : FormGroup;
 

  /**
   * constructor
   * @param categoriesService 
   * 
   * @param router 
   */
  constructor(private categoriesService: CategoriesService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
      this.categoriesSearchForm  =  new FormGroup({
   
        keyword: new FormControl('')
        
      });
   // this.displayAllCategories();
    this.getPageOfCategoryByKeyword();
    
    
  }


  








  
 



  /****************************************************************
   * begin      methodes from admin category
   * **************************************************************
   * ***************************************************************
   * * ***************************************************************
   * ***************************************************************
   */

  displayAllCategories(){
    
    this.categoriesService.getPagesOfCatgories(this.currentPage, this.size)
    .subscribe({
      next: (data)=>{
        
        this.categories = data.content;
      
        this.totalOfPages = data.totalPages;
       
        this.categoriesArray = new Array(this.totalOfPages);
        this.currentPage = data.number;
        console.log(this.categories);
      }, error: (err)=>{
        //il faut afficher une boite de dialogue
      
        this.errorMessage = "connection internet error"
        
      }
    })
   
    }

    searchCategoriesByKeyword(){
    
     
      this.getPageOfCategoryByKeyword();
       
       
     }


    onGetProducts(c){
      this.currentCategory = c;
     
      this.router.navigate(['products', c.id]);
      
    }
  
  
  /**
   * 
   * @param c delete category
   */
  onDeleteCat(c){
  
    
      
    
    if (confirm('Are sure you want to remove this category')) {
      this.categoriesService.deleteCategory(c.id)
    .subscribe({
      next: (data)=> {
     
        this.getPageOfCategoryByKeyword();
       
  
      }
    })
    } else return;
    
    }
  
  
  
   
    /***
     * create category
     */
  
    onUpdateCat(id){
     
      this.router.navigate(['updatecategory', id]);
    }
    onCreateCat(){
      this.router.navigateByUrl('createCategory');
    }


     /**
   * 
   * @param i go to page i
   */

  goToPage(i: number){
    this.currentPage = i;
    //this.displayAllCategories();
    
    this.getPageOfCategoryByKeyword();
  }

  
    isAdmin(){
      return this.authenticationService.isAdmin();
    }




   /****************************************************************
   * end      methodes from admin category
   * **************************************************************
   * ***************************************************************
   * * ***************************************************************
   * ***************************************************************
   */

   public getPageOfCategoryByKeyword(){
    
     this.keyword = this.categoriesSearchForm.controls.keyword.value;
     
     this.categoriesService.getPagesOfCategoriesByKw(
      this.keyword,
      this.currentPage, 
      this.size)
        .subscribe({
          next: (data: any)=>{
            this.categories = data.content;
            this.totalOfPages = data.totalPages;
           
            this.categoriesArray = new Array(data.totalPages);
            this.currentPage = data.number;
            this.size = data.size;
            //console.log("data " +  JSON.stringify(data));
          }, error: (err)=> this.errorMessage = err,
        })
   }
       





  

  

}
