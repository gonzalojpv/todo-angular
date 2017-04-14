import { Injectable } from '@angular/core';
import { Task } from './task';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {

  lastId: number = 0;
  tasks: Task[] = [];
  heroesUrl: string = '';
  headers: Headers =  new Headers({
    'auth':'jinto d0763edaa9d9bd2a9516280e9044d885',
  });

  constructor( private http: Http ) {
    this.heroesUrl = 'http://apisilex.proof.code/tasks/';
  }

  addTask( task: Task ): TaskService {

    let options = new RequestOptions({ headers: this.headers });
    let body = JSON.stringify(task);

    //this.http.post(this.heroesUrl, body, options ).toPromise().then(response => response.json() );
    this.http.get(this.heroesUrl, {
      'headers': this.headers
    } ).toPromise().then(response => response.json() );

    return this;
  }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.heroesUrl, { 'headers': this.headers} )
               .toPromise()
               .then(response => response.json() as  Task[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
