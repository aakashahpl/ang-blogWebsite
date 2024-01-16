import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyBackendService {
  private backendUrl = 'http://localhost:3001/category';
  private jwtToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWVlMTY1ZGNkM2ZkZDJiZTlkY2MwZiIsInVzZXJuYW1lIjoiaGFycnkifSwiaWF0IjoxNzA1MDcyNjg3fQ.XAl6lfQfGl8wuqmfUfTdZp-JtkTcpPmUB5Eyu0IVBO4';

  constructor() {}

  // Set JWT token for authentication
  // setJwtToken(token: string): void {
  //   this.jwtToken = token;
  // }S

  // Clear JWT token (logout)
  // clearJwtToken(): void {
  //   this.jwtToken = null;
  // }

  // Example of a GET request with JWT token
  getData(): Observable<any> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: `${this.backendUrl}/fetch`,
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
  postData(payload: any): Observable<any> {
    const axiosConfig: AxiosRequestConfig = {
      method: 'post',
      url: `${this.backendUrl}/save`,
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
}
