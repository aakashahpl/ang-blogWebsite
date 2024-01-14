import { Component, OnInit } from '@angular/core';
import { MyBackendService } from '../my-api-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private MyBackendService:MyBackendService) {}

  ngOnInit(): void {
    const jwtToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWVlMTY1ZGNkM2ZkZDJiZTlkY2MwZiIsInVzZXJuYW1lIjoiaGFycnkifSwiaWF0IjoxNzA1MDcyNjg3fQ.XAl6lfQfGl8wuqmfUfTdZp-JtkTcpPmUB5Eyu0IVBO4"
    // this.myBackendService.setJwtToken(jwtToken);




  }

  onSubmit(formData: any) {
    let category = formData.value;
    category["status"]=true
    const postData = category;
    console.log(category);
    this.MyBackendService.postData(postData).subscribe((data) => {
      console.log('Data:', data);
    });

  }
}
