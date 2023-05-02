import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data!: any[];
  tvshows!: any[];
  seasons!: any[];
  episodes!: any[];
  myNodes!: any[];
  myLinks!: any[];

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.tvshows = [];
    this.seasons = [];
    this.episodes = [];
    this.http.get<any[]>(environment.apiUrl + '/tvshow').subscribe((data) => {
      this.data = data;
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
      this.convertToNodesAndLinks();
      this.renderSimulation(this.myNodes, this.myLinks);
      // this.renderSimulationExample();
      // this.renderSimulation(
      //   [
      //     {
      //       "tag": "Breaking Bad Demo",
      //       "type": "TVShow",
      //     },
      //     {
      //       "tag": "Season 1",
      //       "type": "Season",
      //     },
      //     {
      //       "tag": "First",
      //       "type": "Episode",
      //     },
      //     {
      //       "tag": "Second",
      //       "type": "Episode",
      //     },
      //   ],
      //   [
      //     {
      //       "source": 1,
      //       "target": 0
      //     },
      //     {
      //       "source": 2,
      //       "target": 1
      //     },
      //     {
      //       "source": 3,
      //       "target": 1
      //     },
      //   ]
      // );
    });

    
  }

  // Source for concept: https://www.d3indepth.com/force-layout/ 

  convertToNodesAndLinks() {
    let nodesToReturn = [];
    let linksToReturn = [];
    for (let index = 0; index < this.tvshows.length; index++) {
      const node = {
        "tag": this.tvshows[index].title,
        "type": "TVShow",
        "id": this.tvshows[index].tvshowId
      }
      nodesToReturn.push(node);
    }

    for (let index = 0; index < this.seasons.length; index++) {
      const node = {
        "tag": "Season " + this.seasons[index].seasonNumber,
        "type": "Season",
        "id": this.seasons[index].seasonId
      }
      nodesToReturn.push(node);
      const sourceNodeIndex = nodesToReturn.length - 1
      const targetNodeIndex = nodesToReturn.map(n => n.id).indexOf(this.seasons[index].parentTVShow.tvshowId);
      const link = {
        "source": sourceNodeIndex,
        "target": targetNodeIndex,
      }
      linksToReturn.push(link);
    }

    for (let index = 0; index < this.episodes.length; index++) {
      const node = {
        "tag": "Episode " + this.episodes[index].episodeNumber + ": " + this.episodes[index].title,
        "type": "Episode",
        "id": this.episodes[index].episode
      }
      nodesToReturn.push(node);
      const sourceNodeIndex = nodesToReturn.length - 1
      const targetNodeIndex = nodesToReturn.map(n => n.id).indexOf(this.episodes[index].parentSeason.seasonId);
      const link = {
        "source": sourceNodeIndex,
        "target": targetNodeIndex,
      }
      linksToReturn.push(link);
    }

    this.myNodes = nodesToReturn;
    this.myLinks = linksToReturn;
  }

  renderSimulationExample() {
    const width = 800
    const height = 600;

    const nodes = [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Cranberry'},
      {name: 'Denim'},
      {name: 'Every'},
      {name: 'Forgot'},
      {name: 'Gogurt'},
      {name: 'Hurry'},
    ]

    const links = [
      {source: 0, target: 1},
      {source: 0, target: 2},
      {source: 0, target: 3},
      {source: 1, target: 6},
      {source: 3, target: 4},
      {source: 3, target: 7},
      {source: 4, target: 5},
      {source: 4, target: 7}
    ]

    function updateLinks() {
      var u = d3.select('.links')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr("stroke", "#999")
        .attr('x1', function(d:any) {
          return d.source.x
        })
        .attr('y1', function(d:any) {
          return d.source.y
        })
        .attr('x2', function(d:any) {
          return d.target.x
        })
        .attr('y2', function(d:any) {
          return d.target.y
        });
    }

    function updateNodes() {
      var u = d3.select('.nodes')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text(function(d) {
          return d.name
        })
        .attr('x', function(d:any) {
          return d.x
        })
        .attr('y', function(d:any) {
          return d.y
        })
        .attr('dx', function(d:any) {
          return 5
        })
        .attr('dy', function(d:any) {
          return 7
        });

      d3.select('.nodes')
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("fill", function(d:any) {
          if (d.name.length % 2 == 0) {
            return "red";
          } else {
            return "green";
          }
        })
        .attr("cx", function(d:any) {
          return d.x
        })
        .attr("cy", function(d:any) {
          return d.y
        })
        .attr("r", 2);
        
    }

    function ticked() {
      updateNodes();
      updateLinks();
    }


    var simulation = d3.forceSimulation(nodes as SimulationNodeDatum[])
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink().links(links))
      .on('tick', ticked);
  }

  renderSimulation(nodes:any, links:any) {
    const width = 2000;
    const height = 2000;

    function updateLinks() {
      var u = d3.select('.links')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr("stroke", "#999")
        .attr('x1', function(d:any) {
          return d.source.x
        })
        .attr('y1', function(d:any) {
          return d.source.y
        })
        .attr('x2', function(d:any) {
          return d.target.x
        })
        .attr('y2', function(d:any) {
          return d.target.y
        });
    }

    function updateNodes() {
      var u = d3.select('.nodes')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text(function(d:any) {
          return d.tag
        })
        .attr('x', function(d:any) {
          return d.x
        })
        .attr('y', function(d:any) {
          return d.y
        })
        .attr('dx', function(d:any) {
          return 5
        })
        .attr('dy', function(d:any) {
          return 7
        });

      d3.select('.nodes')
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("fill", function(d:any) {
          if (d.type === "TVShow") {
            return "black";
          } else if (d.type === "Season"){
            return "red";
          } else {
            return "green";
          }
        })
        .attr("cx", function(d:any) {
          return d.x
        })
        .attr("cy", function(d:any) {
          return d.y
        })
        .attr("r", 4);
        
    }

    function ticked() {
      updateNodes();
      updateLinks();
    }


    var simulation = d3.forceSimulation(nodes as SimulationNodeDatum[])
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink().links(links))
      .on('tick', ticked);
  }

}
