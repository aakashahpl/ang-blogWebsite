// import { CanActivateFn } from '@angular/router';
// import { MyBackendService } from '../my-api-service.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   return MyBackendService.isLoggedInGuard;
// };

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
    if (this.myBackendService.isLoggedInGuard) {
      console.log('Access Granted ...');
      return true;
    } else {
      this.toastr.warning("You dont have persmission to view this page ...");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
