import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  onSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const email = (target[0] as HTMLInputElement).value;
    const password = (target[1] as HTMLInputElement).value;
    // console.log(email, password);
  }
}
