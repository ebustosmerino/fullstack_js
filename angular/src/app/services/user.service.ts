import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService {

  public url: string;

  constructor( private http:HttpClient ) {
    this.url = GLOBAL.url;
  }

  signup(){
    console.log('Hola mundo desde el servicio');
  }

}
