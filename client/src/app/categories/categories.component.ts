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
  categoryArray: any[] | undefined;
  formCategory: string = '';
  formStatus: string = 'Add';

  constructor(
    private MyBackendService: MyBackendService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initialFetchData();
  }

  initialFetchData() {
    this.MyBackendService.getCategoryData().subscribe((data: any) => {
      if (data && data.categories) {
        this.categoryArray = data.categories;
        console.log(this.categoryArray);
        //*-*
      }
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
      status: true,
    };

    this.MyBackendService.postCategoryData(categoryData).subscribe((data) => {
      this.toastr.success('Data inserted successfully ..!');
    });

    this.initialFetchData();

    formData.reset();
  }

  onEdit(category: string) {
    this.formCategory = category;
    this.formStatus = 'Edit';
  }

  onDelete(id: string) {
    this.MyBackendService.deleteCategoryData(id).subscribe((data) => {
      this.toastr.success('Data deleted');
      this.initialFetchData();
    });
  }
}
