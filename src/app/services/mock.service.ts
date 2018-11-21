import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import 'rxjs/add/observable/of';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  constructor(private url: string, private http: HttpClient) {
    this.url = this.url;
  }

  getAll() {
    return of([
      {
        'file_type': 'Hola',
        'song_title': 'carambola'
      },
      {
        'file_type': 'pepito',
        'song_title': 'juanito'
      },
      {
        'file_type': 'juanito',
        'song_title': 'pepito'
      }
    ]);
  }


  create(resource) {
    return null;
  }

  update(resource) {
    return null;
  }

  delete(id) {
    return null;
  }
}
