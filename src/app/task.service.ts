import { Injectable } from '@angular/core';
import { Task } from './task';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {

  lastId: number = 0;
  task: Task[] = [];
  heroesUrl: string = '';

  constructor( private http: Http ) {
    this.heroesUrl = 'http://apisilex.proof.code/messages/1';
  }

  addTask( task: Task ): TaskService {

    let headers = new Headers({
      'auth':'jinto d0763edaa9d9bd2a9516280e9044d885',
    });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(task);

    //this.http.post(this.heroesUrl, body, options ).toPromise().then(response => response.json() );
    this.http.get(this.heroesUrl, {
      'headers': headers
    } ).toPromise().then(response => response.json() );

    return this;
  }

}
