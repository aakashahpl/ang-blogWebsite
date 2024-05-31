import { Component,ViewChild } from '@angular/core';
import { MyBackendService } from '../../my-api-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    private MyBackendService: MyBackendService,
    private router: Router
  ) {}


  onSubmit(formValues: any) {
    this.MyBackendService.setJwtKey(formValues)
    this.loginForm.reset()
   
  }
}
