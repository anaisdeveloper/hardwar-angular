import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { AuthenticationService } from '../services/authentication.service';
import { isNumber } from 'util';

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
    pagesArray: Array<Number>= [];
    pages: Array<Number>= [];
  

 

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

    this.displayAllCategories();
    
    
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
       
        this.pagesArray = new Array(this.totalOfPages);
        this.currentPage = data.number;
      }, error: (err)=>{
        //il faut afficher une boite de dialogue
      
        this.errorMessage = "connection internet error"
        
      }
    })
   
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
        this.displayAllCategories();
  
       
  
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
    this.displayAllCategories();
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





  

  

}
