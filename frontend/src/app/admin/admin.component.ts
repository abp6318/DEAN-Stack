import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data!: any[];
  tvshows!: any[];
  seasons!: any[];
  episodes!: any[];

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.tvshows = [];
    this.seasons = [];
    this.episodes = [];
    await this.http.get<any[]>(environment.apiUrl + '/tvshow').subscribe((data) => {
      this.data = data;
      console.log(data);
      for (let index=0; index<data.length; index++) {
        const item = data[index]._fields;
        for (let itemIndex=0; itemIndex<item.length; itemIndex++) {
          const label = item[itemIndex]?.labels?.[0];
          if (label === "TVShow") {
            const title = item[itemIndex]?.properties?.title;
            const tvshowId = item[itemIndex + 3]?.low
            if (!this.tvshows.map(tvshow => tvshow.tvshowId ).includes(tvshowId)){
              this.tvshows = [...this.tvshows, { "title": title, "tvshowId": tvshowId }];
            }
          } else if (label === "Season") {
            const summary = item[itemIndex]?.properties?.summary;
            const seasonNumber = item[itemIndex]?.properties?.seasonNumber.low;
            const seasonId = item[itemIndex + 3]?.low

            const title = item[itemIndex - 1]?.properties?.title;
            const tvshowId = item[itemIndex + 2]?.low

            if (!this.seasons.map(season => season.seasonId ).includes(seasonId)){
              this.seasons = [...this.seasons, { 
                "summary": summary, 
                "seasonNumber": seasonNumber, 
                "seasonId": seasonId, 
                "parentTVShow": {
                  "title": title,
                  "tvshowId": tvshowId,
                } 
              }];
            }
          } else if (label === "Episode") {
            const plot = item[itemIndex]?.properties?.plot;
            const airDate = item[itemIndex]?.properties?.airDate;
            const title = item[itemIndex]?.properties?.title;
            const episodeNumber = item[itemIndex]?.properties?.episodeNumber.low;
            const episodeId = item[itemIndex + 3]?.low

            const tvshowTitle = item[itemIndex - 2]?.properties?.title;
            const tvshowId = item[itemIndex + 1]?.low

            const summary = item[itemIndex - 1]?.properties?.summary;
            const seasonNumber = item[itemIndex - 1]?.properties?.seasonNumber.low;
            const seasonId = item[itemIndex + 2]?.low

            if (!this.episodes.map(episode => episode.episodeId ).includes(episodeId)){
              this.episodes = [...this.episodes, { 
                "plot": plot, 
                "airDate": airDate, 
                "title": title, 
                "episodeNumber": episodeNumber, 
                "episodeId": episodeId,
                "parentTVShow": {
                  "title": tvshowTitle,
                  "tvshowId": tvshowId,
                },
                "parentSeason": {
                  "summary": summary,
                  "seasonNumber": seasonNumber,
                  "seasonId": seasonId,
                }
              }];
            }
          }
        }
      }
    });
  }

  async onSubmitPostTVShow(event: Event) {
    event.preventDefault();

    const BASE_URL = environment.apiUrl;
    const cookies = new Cookies();
    const user = cookies.get('user');

    if (user) {
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
          alert("New show created!");
        })
        .catch(function(error) {
          console.log('error', error);
        });
    } else {
      console.log("need to redirect to login");
    }
  }

  async onSubmitPutTVShow(event: Event) {
    event.preventDefault();

    const BASE_URL = environment.apiUrl;
    const cookies = new Cookies();
    const user = cookies.get('user');

    if (user) {
      const email = user.email;
      const token = user.token;
      const target = event.target as HTMLFormElement;
      const tvshowId = (target[0] as HTMLInputElement).value;
      const title = (target[1] as HTMLInputElement).value;

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", "Bearer " + token);

      const raw = JSON.stringify({
        "email": email,
        "title": title,
        "id": parseInt(tvshowId)
      });

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
      };

      await fetch(`${BASE_URL}/tvshow`, requestOptions)
        .then(response => response.json())
        .then(function(result) {
          console.log(result);
          alert("Show updated!");
        })
        .catch(function(error) {
          console.log('error', error);
        });
    } else {
      console.log("need to redirect to login");
    }
  }

  async onSubmitDeleteTVShow(event: Event) {
    event.preventDefault();

    const BASE_URL = environment.apiUrl;
    const cookies = new Cookies();
    const user = cookies.get('user');

    if (user) {
      const email = user.email;
      const token = user.token;
      const target = event.target as HTMLFormElement;
      const tvshowId = (target[0] as HTMLInputElement).value;

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", "Bearer " + token);

      const raw = JSON.stringify({
        "email": email,
        "id": parseInt(tvshowId)
      });

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
      };

      await fetch(`${BASE_URL}/tvshow`, requestOptions)
        .then(response => response.json())
        .then(function(result) {
          console.log(result);
          alert("Show deleted!");
        })
        .catch(function(error) {
          console.log('error', error);
        });
    } else {
      console.log("need to redirect to login");
    }
  }

  async onSubmitPostSeason(event: Event) {
    event.preventDefault();

    const BASE_URL = environment.apiUrl;
    const cookies = new Cookies();
    const user = cookies.get('user');

    if (user) {
      const email = user.email;
      const token = user.token;
      const target = event.target as HTMLFormElement;
      const tvshowId = (target[0] as HTMLInputElement).value;
      const seasonNumber = (target[1] as HTMLInputElement).value;
      const summary = (target[2] as HTMLInputElement).value;

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", "Bearer " + token);

      const raw = JSON.stringify({
        "email": email,
        "summary": summary,
        "seasonNumber": parseInt(seasonNumber),
        "tvshowId": parseInt(tvshowId),
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      await fetch(`${BASE_URL}/season`, requestOptions)
        .then(response => response.json())
        .then(function(result) {
          console.log(result);
          alert("New season created!");
        })
        .catch(function(error) {
          console.log('error', error);
        });
    } else {
      console.log("need to redirect to login");
    }
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
