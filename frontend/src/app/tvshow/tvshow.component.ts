import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.css']
})
export class TvshowComponent {
  data!: any[];
  tvshows!: any[];
  seasons!: any[];
  episodes!: any[];
  myNodes!: any[];
  myLinks!: any[];

  routeSub: any;

  title!:String;
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.tvshows = [];
    this.seasons = [];
    this.episodes = [];
    this.title = "";

    this.routeSub = this.route.params.subscribe(params => {
      this.title = params['title'];
    });

    this.http.get<any[]>(environment.apiUrl + '/tvshow?title=' + this.title).subscribe((data) => {
      this.data = data;
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        const item = data[index]._fields;
        for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
          const label = item[itemIndex]?.labels?.[0];
          if (label === "TVShow") {
            const title = item[itemIndex]?.properties?.title;
            const tvshowId = item[itemIndex + 3]?.low;
            if (!this.tvshows.map(tvshow => tvshow.tvshowId).includes(tvshowId)) {
              this.tvshows = [...this.tvshows, { "title": title, "tvshowId": tvshowId }];
            }
          } else if (label === "Season") {
            const summary = item[itemIndex]?.properties?.summary;
            const seasonNumber = item[itemIndex]?.properties?.seasonNumber.low;
            const seasonId = item[itemIndex + 3]?.low;

            const title = item[itemIndex - 1]?.properties?.title;
            const tvshowId = item[itemIndex + 2]?.low;

            if (!this.seasons.map(season => season.seasonId).includes(seasonId)) {
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
            const episodeId = item[itemIndex + 3]?.low;

            const tvshowTitle = item[itemIndex - 2]?.properties?.title;
            const tvshowId = item[itemIndex + 1]?.low;

            const summary = item[itemIndex - 1]?.properties?.summary;
            const seasonNumber = item[itemIndex - 1]?.properties?.seasonNumber.low;
            const seasonId = item[itemIndex + 2]?.low;

            if (!this.episodes.map(episode => episode.episodeId).includes(episodeId)) {
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
      console.log("shows: ", this.tvshows);
      console.log("seasons: ", this.seasons);
      console.log("episodes: ", this.episodes);

      this.episodes = this.episodes.sort((a, b) => (a.parentSeason.seasonNumber > b.parentSeason.seasonNumber) ? 1 : (a.parentSeason.seasonNumber === b.parentSeason.seasonNumber) ? ((a.episodeNumber > b.episodeNumber) ? 1 : -1) : -1 )

    }); 
  }
}
