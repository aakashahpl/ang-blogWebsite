import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  permaLink:string="";
  imgSrc:any="./assets/image placeholder.jpg"; 
  selectedImg:any; 
  postForm:FormGroup;


constructor(private fb:FormBuilder) {
  this.postForm=this.fb.group({
    title:['',[Validators.required,Validators.minLength(10) ]],
    permalink:['',Validators.required],
    excerpt  :['',[Validators.required,Validators.minLength(10) ]],
    category:['',Validators.required],
    postImg:['',Validators.required],
    content:['',Validators.required]  
  })
 }

 get fc(){
  return this.postForm.controls;
 }


  onTitleChanged($event:any) {
      const title=$event.target.value;
      this.permaLink=title.replace(/\s/g ,'-')

      
      
  }
  showPreview($event:any){
    const reader=new FileReader();
    reader.onload=(e)=>{
      this.imgSrc=e.target?.result; 
    }
    reader.readAsDataURL($event.target.files[0])
    this.selectedImg=$event.target.files[0];
  }


  onSubmit(){
    console.log(this.postForm.value);
    const postData: Post ={
      title:this.postForm.value.title,
      permalink:this.postForm.value.permalink,
      category:{
        categoryId:"",
        category:""
      },
      postImgPath:this.postForm.value.postImg,
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views: 0,
      status:"new",
      createdAt:new Date()
    }
  }

  }




