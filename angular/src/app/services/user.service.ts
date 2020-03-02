import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { GLOBAL } from './global';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UserService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  signup(user_to_login) {
    let json = JSON.stringify(user_to_login);
    let params = json;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.url + 'login', params, { headers: headers });
  }

}
