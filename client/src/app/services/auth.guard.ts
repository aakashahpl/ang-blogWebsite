import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { MyBackendService } from '../my-api-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private myBackendService: MyBackendService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Use the isLoggedIn() method that returns the current boolean value
    if (this.myBackendService.isLoggedIn()) {
      console.log('Access Granted ...');
      return true;
    } else {
      this.toastr.warning("You don't have permission to view this page ...");
      this.router.navigate(['/login']);
      return false;
    }
  }
}