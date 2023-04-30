import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  async onSubmitPostTVShow(event: Event) {
    event.preventDefault();

    const BASE_URL = environment.apiUrl;
    const cookies = new Cookies();
    const user = cookies.get('user');

    if (user) {
      console.log("user logged in");
      const email = user.email;
      const token = user.token;
      const target = event.target as HTMLFormElement;
      const title = (target[0] as HTMLInputElement).value;

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", "Bearer " + token);

      const raw = JSON.stringify({
        "email": email,
        "title": title,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      await fetch(`${BASE_URL}/tvshow`, requestOptions)
        .then(response => response.json())
        .then(function(result) {
          console.log(result);
        })
        .catch(function(error) {
          console.log('error', error);
        });
    } else {
      console.log("need to redirect to login");
    }
  }

  async onSubmitPutTVShow(event: Event) {
    // TODO: email, tvshowId and title
  }

  async onSubmitDeleteTVShow(event: Event) {
    // TODO: email and tvshowId
  }

  async onSubmitPostSeason(event: Event) {
    // TODO: email, tvshowId, seasonNumber and summary
  }

  async onSubmitPutSeason(event: Event) {
    // TODO: email, seasonId, seasonNumber and summary
  }

  async onSubmitDeleteSeason(event: Event) {
    // TODO: email and seasonId
  }

  async onSubmitPostEpisode(event: Event) {
    // TODO: email, seasonId, airDate, episodeNumber, plot and title
  }

  async onSubmitPutEpisode(event: Event) {
    // TODO: email, episodeId, airDate, episodeNumber, plot and title
  }

  async onSubmitDeleteEpisode(event: Event) {
    // TODO: email and episodeId
  }
}
