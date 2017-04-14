import { Injectable } from '@angular/core';
import { Task } from './task';
import { Headers, RequestOptions, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {

  lastId: number = 0;
  tasks: Task[] = [];
  heroesUrl: string = '';
  headers: Headers =  new Headers({
    'auth':'jinto d0763edaa9d9bd2a9516280e9044d885'
  });

  constructor( private http: Http ) {
    this.heroesUrl = 'http://apisilex.proof.code/tasks/';
  }

  create( task: Task ): Promise<Task> {

    task.complete = task.complete ? 1: 0 ;
    this.headers.append('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: this.headers } );
    let params: URLSearchParams = this.serialize(task);

    return this.http
               .post(this.heroesUrl, params, options )
               .toPromise()
               .then(response => response.json() as Task)
               .catch(this.handleError);
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

  /**
  * Serializes the form element so it can be passed to the back end through the url.
  * The objects properties are the keys and the objects values are the values.
  * ex: { "a":1, "b":2, "c":3 } would look like ?a=1&b=2&c=3
  * @param  {SystemSetup} obj - The system setup to be url encoded
  * @returns URLSearchParams - The url encoded system setup
  */
  serialize(obj: Task): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var element = obj[key];

            params.set(key, element);
        }
    }
    return params;
  }

}
