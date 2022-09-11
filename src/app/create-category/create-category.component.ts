import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../models/category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  
  
  category : Category = new Category(' ', ' ', []);

  title : string = "Create  New Category";
  
  
  errorMessage : string = '';
  error : boolean = false;
  idCat : string = ' ';
  
  isCreateCategory : boolean = true;
  

  newCategoryForm: FormGroup =  new FormGroup({
  
    name : new FormControl(''),
    
    
  });

  /**
   * contructor
   * @param categoriesService 
   * @param activatedRoute 
   * @param router 
   */
  constructor(private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    
    private router: Router) { 
    
     
      
      if (this.activatedRoute.snapshot.params['id'] != null) {
        
       
        this.idCat = this.activatedRoute.snapshot.params['id'];
      this.idCat= this.activatedRoute.snapshot.params['id'];
        this.getCategory(this.idCat);
        this.isCreateCategory= false;

        
      }else this.isCreateCategory= true;


    }

  ngOnInit(): void {

    


    if (!this.isCreateCategory) {
      this.title = "Update  this category";
      
      
      
     
    } 

  }


  /**
   * form submit
   */
  onSubmit(){
    this.category = this.newCategoryForm.value;
    if (this.isCreateCategory) {
      
        this.onSaveNewCategory();
        
    } else {
      
      this.updateCategory();
      
     
    }


    this.isCreateCategory = true;
    this.router.navigateByUrl("/categories");
    
   
  }

  onSaveNewCategory(){
    this.category = this.newCategoryForm.value;
    this.categoriesService.createNewCategory(this.category)
    .subscribe({
      next: (data)=>{
       
       
        this.router.navigateByUrl('/categories');
      }, error:(err)=>{
        this.errorMessage = err;
        
      }
    })
  }


 


  updateCategory(){
    
    this.category = this.newCategoryForm.value;
    this.category.id = this.idCat;
    
    this.categoriesService.updateCategory(this.category)
    .subscribe({
      next: data => {
        
      },
      error: error => {
          this.errorMessage = error.message;
          
          
      }
  })
  
}


/**
 * get category method
 */

getCategory(id) {
  
  this.categoriesService.getCategoryById(id)
  .subscribe({
    next: data => {
     
      this.category  =  JSON.parse(JSON.stringify(data));
      this.newCategoryForm.patchValue({
        name: this.category.name,
        
      });
     
    }, error: err => this.errorMessage = err,
  });
 
}

}
