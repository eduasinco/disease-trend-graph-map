import { Injectable } from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PostService extends DataService {

  constructor(http: HttpClient) {
    super('posts/', http);
  }
}
