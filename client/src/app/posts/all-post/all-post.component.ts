import { Component, OnInit } from '@angular/core';
import { MyBackendService } from 'src/app/my-api-service.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  postArray: any[] =[];



  constructor(private MyBackendService: MyBackendService) {}

  ngOnInit(): void {
    this.MyBackendService.getPostData().subscribe((data:any)=>{
      this.postArray = data.posts; 
      console.log( "post array",this.postArray);
    })
  }

  

    //!Complete the function below to toggle the featured status of a post
  
  onFeatured(id:string, value:boolean){
    
  }

  


}
