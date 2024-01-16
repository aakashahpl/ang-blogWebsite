import { Component, OnInit } from '@angular/core';
import { MyBackendService } from '../my-api-service.service';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {

  categoryArray: Category[] | undefined;
  formCategory:string="";
  formStatus:string="Add";
  
  constructor(private MyBackendService:MyBackendService ,private toastr: ToastrService) {}
  
  ngOnInit(): void {
    // const jwtToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWVlMTY1ZGNkM2ZkZDJiZTlkY2MwZiIsInVzZXJuYW1lIjoiaGFycnkifSwiaWF0IjoxNzA1MDcyNjg3fQ.XAl6lfQfGl8wuqmfUfTdZp-JtkTcpPmUB5Eyu0IVBO4"
    // // this.myBackendService.setJwtToken(jwtToken);


    this.MyBackendService.getData().subscribe((data:any)=>{
      if (data && data.categories ){

        this.categoryArray=data.categories;
        // console.log(this.categoryArray);
//*-*        
      }
    }
)





  }

  onSubmit(formData: any) {
    let categoryData:Category = {
      category: formData.value.category,
      status: true,
    }
 
    this.MyBackendService.postData(categoryData).subscribe((data) => {
      // console.log('Data:', data);
      this.toastr.success('Data inserted successfully ..!');
    });

    formData.reset();

  }


  onEdit(category:string){
    this.formCategory=category;
    this.formStatus="Edit";
      
  }







}
