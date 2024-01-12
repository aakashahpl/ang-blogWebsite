import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  onSubmit(formValues: any) {
    console.log(formValues);
    const apiUrl = 'http://localhost:3001/login';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type if sending JSON data
        // Add any additional headers if needed
      },
      body: JSON.stringify(formValues), // Convert the data to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
