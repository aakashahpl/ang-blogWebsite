import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyBackendService {
  private categorybackendUrl = `${environment.Backend_URL}/category`;
  private postBackendUrl = `${environment.Backend_URL}/post`;
  private loginurl = `${environment.Backend_URL}/login`;
  private jwtTokenKey = 'this_is_secret';
  private jwtToken: string = '';
  userEmailKey: string = 'userEmail';
  private userEmail: string = '';
  
  // Initialize loggedIn status based on whether a JWT token exists in localStorage
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router) {
    this.jwtToken = localStorage.getItem(this.jwtTokenKey) || '';
    this.userEmail = localStorage.getItem(this.userEmailKey) || '';
    
    // Initialize the loggedIn state based on whether a valid token exists
    const hasToken = !!this.jwtToken;
    this.loggedIn.next(hasToken);
  }

  getCategoryData(): Observable<any> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: `${this.categorybackendUrl}/fetch`,
      headers: this.getHeaders(),
      // other configurations as needed
    };

    return new Observable((observer) => {
      axios(axiosConfig)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Example of a POST request with JWT token
  postCategoryData(payload: any): Observable<any> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'post',
      url: `${this.categorybackendUrl}/save`,
      data: payload,
      headers: this.getHeaders(),
      // other configurations as needed
    };

    return new Observable((observer) => {
      axios(axiosConfig)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  postData(payload: any): Observable<any> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'post',
      url: `${this.postBackendUrl}/save`,
      data: payload,
      headers: this.getHeaders2(),

      // other configurations as needed
    };

    return new Observable((observer) => {
      axios(axiosConfig)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getPostData() {
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: `${this.postBackendUrl}/fetch`,
      headers: this.getHeaders(),
    };

    return new Observable((observer) => {
      axios(axiosConfig)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  getPostImg(imgPath: string) {
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: `${this.postBackendUrl}/uploads/images/${imgPath}`,
      headers: this.getHeaders(),
    };

    return new Observable((observer) => {
      axios(axiosConfig)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteCategoryData(id: string): Observable<any> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'delete',
      url: `${this.categorybackendUrl}/delete/${id}`,
      headers: this.getHeaders(),
      // other configurations as needed
    };

    return new Observable((observer) => {
      axios(axiosConfig)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  setJwtKey(formValues: any) {
    axios
      .post(this.loginurl, formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.data && response.data.accessToken) {
          this.jwtToken = response.data.accessToken;
          this.userEmail = formValues.username;
          localStorage.setItem(this.jwtTokenKey, this.jwtToken);
          localStorage.setItem(this.userEmailKey, this.userEmail);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    // Clear the token from localStorage when the user logs out
    this.jwtToken = '';
    this.userEmail = '';
    localStorage.removeItem(this.jwtTokenKey);
    localStorage.removeItem(this.userEmailKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // Return if the user is currently logged in
  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  // Get the observable for tracking login state changes
  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Utility function to get headers with JWT token
  private getHeaders(): { [key: string]: string } {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };

    if (this.jwtToken) {
      headers['Authorization'] = `${this.jwtToken}`;
    }

    return headers;
  }
  private getHeaders2(): { [key: string]: string } {
    const headers: { [key: string]: string } = {
      'Content-Type': 'multipart/form-data',
    };

    if (this.jwtToken) {
      headers['Authorization'] = `${this.jwtToken}`;
    }

    return headers;
  }

  // Toggle the featured status of a post
  markFeatued(id: string, featuredData: boolean): Observable<any> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'patch',
      url: `${this.postBackendUrl}/feature/${id}`,
      data: { featured: featuredData },
      headers: this.getHeaders(),
    };

    return new Observable((observer) => {
      axios(axiosConfig)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
