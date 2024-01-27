// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Post } from 'src/app/models/post';
// import { MyBackendService } from '../../my-api-service.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-new-post',
//   templateUrl: './new-post.component.html',
//   styleUrls: ['./new-post.component.css'],
// })
// export class NewPostComponent implements OnInit {
//   permaLink: string = '';
//   imgSrc: any = './assets/image placeholder.jpg';
//   selectedImg: any;
//   postForm: FormGroup;
//   Categories: any[] | undefined;

//   ngOnInit(): void {
//     this.MyBackendService.getCategoryData().subscribe((data) => {
//       this.Categories = data.categories;   
      
//     });

//   }

//   constructor(
//     private fb: FormBuilder,
//     private MyBackendService: MyBackendService,
//     private toastr: ToastrService
//   ) {
//     this.postForm = this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(10)]],
//       permalink: ['', Validators.required],
//       excerpt: ['', [Validators.required, Validators.minLength(10)]],
//       category: ['', Validators.required],
//       postImg: [null, Validators.required],
//       content: ['', Validators.required],
//     });
//   }

//   get fc() {
//     return this.postForm.controls;
//   }

//   onTitleChanged($event: any) {
//     const title = $event.target.value;
//     this.permaLink = title.replace(/\s/g, '-');

    
//   }
//   showPreview($event: any) {
//     // const reader = new FileReader();
//     // reader.onload = (e) => {
//     //   this.imgSrc = e.target?.result;
//     // };
//     // reader.readAsDataURL($event.target.files[0]);
//     // this.selectedImg = $event.target.files[0];

//     const files = $event.target.files;
    

//     if (files && files.length > 0) {
//       const file = files[0];
  
//       this.postForm.patchValue({
//         postImg: file
//       });
  
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.imgSrc = e.target?.result as string;
//       };
//       reader.readAsDataURL(file);
  
//       // Clear the file input
//       this.postForm.get('postImg')?.setValue(null);
  
//       this.selectedImg = file; // Save the selected image file
//     }
//   }




// onSubmit() {
  
//     let splitted = this.postForm.value.category.split('-');
//     const formData = new FormData();
//     if(this.selectedImg){
//       console.log("image is there");
//     }
//     formData.append('title', this.postForm.value.title);
//     formData.append('permalink', this.permaLink);
//     formData.append('category', this.postForm.value.category);
//     formData.append('postImg', this.selectedImg);
//     formData.append('excerpt', this.postForm.value.excerpt);
//     formData.append('content', this.postForm.value.content);
//     formData.append('isFeatured', 'false');
//     formData.append('views', '0');
//     formData.append('status', 'new');
//     formData.append('createdAt', new Date().toString());
    

//     this.MyBackendService.postData(formData).subscribe((data) => {
//       console.log('Data:', data);
//       this.toastr.success('Data inserted successfully..!');
//     });
  
// }
// } 




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { MyBackendService } from '../../my-api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permaLink: string = '';
  imgSrc: any = './assets/image placeholder.jpg';
  selectedImg: any;
  postForm: FormGroup;
  Categories: any[] | undefined;

  ngOnInit(): void {
    this.MyBackendService.getCategoryData().subscribe((data) => {
      this.Categories = data.categories;   
      
    });

  }

  constructor(
    private fb: FormBuilder,
    private MyBackendService: MyBackendService,
    private toastr: ToastrService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      postImg: [File, Validators.required],
      content: ['', Validators.required],
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permaLink = title.replace(/\s/g, '-');

    
  }
  showPreview($event: any) {

    const files = $event.target.files;
    

    if (files && files.length > 0) {
      const file = files[0];
  
      this.postForm.patchValue({
        postImg: file
      });
  
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target?.result as string;
      };
      reader.readAsDataURL(file);
  
      // Clear the file input
      this.postForm.get('postImg')?.setValue(null);

      this.selectedImg = file; // Save the selected image file
    }
  }

  onSubmit() {

    let splitted=this.postForm.value.category.split('-');
    console.log(this.postForm.value)
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.permaLink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImg: this.selectedImg,
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    console.log("Before posting ->",postData);
    this.MyBackendService.postData(postData).subscribe((data) => {
      console.log('Data:', data);
      this.toastr.success('Data inserted successfully ..!');
    });
  }
}