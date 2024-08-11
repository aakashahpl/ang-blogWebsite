import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyBackendService } from 'src/app/my-api-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string = '';
  isLoggedIn$: Observable<boolean>= new Observable<boolean>();

  //!Fix the issue where clicking the header to navigate to the home page causes logout
  

  ngOnInit(): void {
    this.userEmail=localStorage.getItem(this.MyBackendService.userEmailKey) || '';
    this.isLoggedIn$ = this.MyBackendService.isLoggedIn();

        // Fetch userEmail from local storage
        // this.isLoggedIn$ = this.MyBackendService.isLoggedIn();
        // this.isLoggedIn$.subscribe(isLoggedIn => {
        //   if (isLoggedIn) {
        //     // Fetch userEmail from local storage after the user logs in
        //     this.userEmail = localStorage.getItem(this.MyBackendService.userEmailKey) || '';
        //     console.log('User email:', this.userEmail);
        //   }
        // });


  }

  onLogout() {
    this.MyBackendService.logout();
  }

  constructor(private MyBackendService: MyBackendService) {
    
  //   this.userEmail =
  //     localStorage.getItem(this.MyBackendService.userEmailKey) || '';
  //     console.log(this.userEmail);
  }
  
}
