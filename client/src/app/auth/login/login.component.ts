import { Component } from '@angular/core';
import { MyBackendService } from '../../my-api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(
    private MyBackendService: MyBackendService,
  ) {}


  onSubmit(formValues: any) {
    console.log(formValues);
    this.MyBackendService.setJwtKey(formValues)

  }
}
