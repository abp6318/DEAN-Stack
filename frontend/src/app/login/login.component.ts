import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  async onSubmit(event: Event) {
    event.preventDefault();

    const BASE_URL = environment.apiUrl;
    const cookies = new Cookies();

    const target = event.target as HTMLFormElement;
    const email = (target[0] as HTMLInputElement).value;
    const password = (target[1] as HTMLInputElement).value;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "password": password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    await fetch(`${BASE_URL}/login`, requestOptions)
      .then(response => response.json())
      .then(function(result) {
        const options = {
          path: '/',
          sameSite: true,
          expires: new Date(Date.now()+86400000) // expires in one dayish
        };
        const newCookie = {
          email: email,
          token: result.token,
        }
        cookies.set('user', JSON.stringify(newCookie), options);
        location.reload();
      })
      .catch(function(error) {
        console.log('error', error);
      });
  }
}
