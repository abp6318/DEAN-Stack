import { Component } from '@angular/core';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  forNav!: String
  async ngOnInit() {
    const cookies = new Cookies();
    const user = cookies.get('user');
    if (user.token && user.email) {
      this.forNav = "Logged in as " + user.email
    } else {
      this.forNav = "User not logged in"
    }
  }
}
