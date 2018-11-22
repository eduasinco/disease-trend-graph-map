import {Component, OnInit} from '@angular/core';
import {PostService} from '../services/post/post.service';
import {AppError} from '../common/app-error';
import {BadInput} from '../common/app-bad-input-error';
import {NotFoundError} from '../common/app-not-found-error';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '../../../node_modules/@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  submited: false;
  posts: any;
  graph: any;
  range = 18;
  date = 2000;
  termm = 'cancer';
  year_array: Array<number>;
  count_array: Array<number>;
  retrieve_ended = false;
  url = environment.API_URL;
  f = this.fb.group({
    term: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
    mindate: [
      '',
      [
        Validators.min(0),
        Validators.max(new Date().getFullYear()),
        Validators.pattern('[0-9]{4}')
      ]
    ],
    maxdate: [
      '',
      [
        Validators.min(0),
        Validators.max(new Date().getFullYear()),
        Validators.pattern('[0-9]{4}')
      ]
    ]
  });

  get term() {
    return this.f.get('term');
  }

  get mindate() {
    return this.f.get('mindate');
  }

  get maxdate() {
    return this.f.get('maxdate');
  }

  constructor(private service: PostService,
              private fb: FormBuilder,
              private http: HttpClient) {

  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.retrieve_ended = false;
    const params = new URLSearchParams();
    // for (const key in this.f.value) {
    //   params.set(key, this.f.value[key]);
    // }
    this.count_array = [];
    this.year_array = [];
    params.set('retmode', 'json');
    params.set('rettype', 'count');
    if (this.f.value.term) {
      this.termm = this.f.value.term;
    }

    if (this.f.value.maxdate && this.f.value.mindate) {
      this.range = Math.abs(parseInt(this.f.value.mindate, 10) - parseInt(this.f.value.maxdate, 10));
      this.date = Math.min(parseInt(this.f.value.mindate, 10), parseInt(this.f.value.maxdate, 10));
    } else if (this.f.value.maxdate) {
      this.range = Math.abs(new Date().getFullYear() - parseInt(this.f.value.maxdate, 10));
      this.date = parseInt(this.f.value.maxdate, 10);
    } else if (this.f.value.mindate) {
      this.range = Math.abs(new Date().getFullYear() - parseInt(this.f.value.mindate, 10));
      this.date = parseInt(this.f.value.mindate, 10);
    }
    let c = 0;
    for (const i of Array.from(Array(this.range).keys())) {
      const year = this.date + i;
      const url = this.url + params.toString() + '&term=' + this.termm + '+AND+' + year;

        this.http.get(url)
        .pipe(catchError(this.handleError))
        .subscribe(posts => {
          this.posts = posts;
          this.count_array.push(this.posts.esearchresult['count']);
          this.year_array.push(year);
          c++;
          if (c === this.range) {
            this.retrieve_ended = true;
            this.graph = {
              data: [
                {
                  x: this.year_array,
                  y: this.count_array,
                  type: 'bar'
                },
              ],
              layout: {
                width: 1200,
                height: 600,
                title: 'Plot'
              }
            };
            }
          }
        );
    }
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error.json()));
    }

    if (error.status === 404) {
      return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
