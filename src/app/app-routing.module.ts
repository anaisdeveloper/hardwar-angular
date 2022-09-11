import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';

import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateProductComponent } from './create-product/create-product.component';



const routes: Routes = [
  {path: "home", component:HomeComponent},
  {path: "", component:HomeComponent},
  {path: "login", component:LoginComponent},
  
  {path: "customers", component:CustomersComponent},
 
  {path: "categories", component:CategoriesComponent},
  {path: "updatecategory/:id", component:CreateCategoryComponent},
  {path: "createCategory", component:CreateCategoryComponent},
  {path: "products", component:ProductsComponent},
  {path: "products/:id", component:ProductsComponent},
  {path: "createProduct/:id", component:CreateProductComponent},
  {path: "updateProduct/:id/:id2", component:CreateProductComponent},
 
 
  
  
  
  

 
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
