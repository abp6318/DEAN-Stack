import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // async onSubmit(event: Event) {
  //   event.preventDefault();

  //   const BASE_URL = environment.apiUrl;
  //   const cookies = new Cookies();
  //   // const user = cookies.get('user');

  //   const target = event.target as HTMLFormElement;
  //   const email = (target[0] as HTMLInputElement).value;
  //   const password = (target[1] as HTMLInputElement).value;

  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const raw = JSON.stringify({
  //     "email": email,
  //     "password": password,
  //   });

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //   };

  //   await fetch(`${BASE_URL}/login`, requestOptions)
  //     .then(response => response.json())
  //     .then(function(result) {
  //       const options = {
  //         path: '/',
  //         sameSite: true,
  //         expires: new Date(Date.now()+86400000) // expires in one dayish
  //       };
  //       const newCookie = {
  //         email: email,
  //         token: result.token,
  //       }
  //       cookies.set('user', JSON.stringify(newCookie), options);
  //     })
  //     .catch(function(error) {
  //       console.log('error', error);
  //     });
  // }

  async onSubmitPostTVShow(event: Event) {
    // TODO: email and title
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
