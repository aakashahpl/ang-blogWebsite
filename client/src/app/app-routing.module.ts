import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'posts',component:AllPostComponent},
  {path:'posts/new',component:NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
