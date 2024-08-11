import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyBackendService {
  private categorybackendUrl = 'https://ang-blog-website.vercel.app/category';
  private postBackendUrl = 'https://ang-blog-website.vercel.app/post';
  private loginurl = 'https://ang-blog-website.vercel.app/login';
  private jwtTokenKey = 'jwtToken';
  private jwtToken: string = '';
  userEmailKey: string = 'userEmail';
  private userEmail: string = '';
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard:boolean=false;
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWVlMTY1ZGNkM2ZkZDJiZTlkY2MwZiIsInVzZXJuYW1lIjoiaGFycnkifSwiaWF0IjoxNzA1MDcyNjg3fQ.XAl6lfQfGl8wuqmfUfTdZp-JtkTcpPmUB5Eyu0IVBO4
  constructor(private router: Router) {
    this.jwtToken = localStorage.getItem(this.jwtTokenKey) || '';
    this.userEmail = localStorage.getItem(this.userEmailKey) || '';
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
          console.log(this.jwtToken);    
          this.userEmail = formValues.username;
          localStorage.setItem(this.jwtTokenKey, this.jwtToken);
          localStorage.setItem(this.userEmailKey, this.userEmail);
          this.loggedIn.next(true);
          this.isLoggedInGuard=true;
           this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    // !Clear the token from localStorage when the user logs out
    this.jwtToken = '';
    this.userEmail = '';
    localStorage.removeItem(this.jwtTokenKey);
    localStorage.removeItem(this.userEmailKey);
    this.router.navigate(['/login']);
    this.loggedIn.next(false);
    this.isLoggedInGuard=false;
  }

  isLoggedIn() {
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

  //!complete the function below to toggle the featured status of a post
  markFeatued(id: string, featuredData: boolean) {}
}
