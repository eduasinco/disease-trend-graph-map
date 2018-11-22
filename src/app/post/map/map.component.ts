import {Component, Input, OnInit} from '@angular/core';
import {} from '@types/googlemaps';
import {environment} from "../../../environments/environment.prod";
import {PostService} from "../../services/post/post.service";
import {HttpClient, HttpHeaders} from "../../../../node_modules/@angular/common/http";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    @Input() disease;
    ids_array;
    retrieve_ended = false;
    address: string;
    articles: any;
    results: any;
    url1 = environment.API_URL;
    url2 = environment.API_URL_2;
    google_url = environment.GOOGLE_MAPS_URL;

    lat = 43.678418;
    lng = -79.809007;
    locations = [];

    constructor(private service: PostService,
                private http: HttpClient) {
    }

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.retrieve_ended = false;
        const url1 = this.url1 + 'db=pubmed&retmode=json&term=' + this.disease;

        this.http.get(url1)
            .subscribe(response => {
                this.ids_array = response;
                this.ids_array = this.ids_array.esearchresult.idlist;
                console.log(this.ids_array);
                const url2 = this.url2 + 'db=pubmed&retmode=xml&id=' + this.ids_array.join(',');


                this.http.get(url2, {responseType: 'text'})
                    .subscribe(response2 => {
                        this.articles = response2.toString()
                        const s = '<Affiliation>'
                        const matches = this.articles.match(/<Affiliation>([\s\S]*?)<\/Affiliation>/g);
                        let locations = [];
                        let c = 0;
                        for (const name of matches) {
                            this.address = name.slice(s.length, name.length - s.length - 1);;
                            const google_url = this.google_url + '&callback=initMap&input=' + this.address.split(' ').join('+');


                            this.http.get(google_url)
                                .subscribe(response3 => {
                                    const results = response3;
                                    for(const candidate of results['candidates']){
                                        this.locations.push([candidate.geometry.location.lat, candidate.geometry.location.lng]);
                                    }
                                });
                        }
                    });
            });

    }

}
