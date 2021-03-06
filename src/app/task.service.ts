import { Injectable } from '@angular/core';
import { Task } from './task';
import { Headers, RequestOptions, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {

  lastId: number = 0;
  tasks: Task[] = [];
  tasksUrl: string = 'http://apisilex.proof.code/tasks/';
  headers: Headers =  new Headers({
    'auth':'jinto d0763edaa9d9bd2a9516280e9044d885'
  });

  constructor( private http: Http ) { }

  create( task: Task ): Promise<Task> {

    task.complete = task.complete ? 1: 0 ;
    this.headers.append('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: this.headers } );
    let params: URLSearchParams = this.serialize(task);

    return this.http
      .post(this.tasksUrl, params, options )
      .toPromise()
      .then(response => response.json() as Task)
      .catch(this.handleError);
  }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl, { 'headers': this.headers} )
      .toPromise()
      .then(response => response.json() as  Task[])
      .catch(this.handleError);
  }

  delete( id: number ): Promise<void> {
    const url = `${this.tasksUrl}${id}`;
    return this.http.delete( url, { headers: this.headers } )
      .toPromise()
      .then( res => res.json() as Task )
      .catch( this.handleError );
  }

  update(todo: Task):Promise<Task> {

    const url = `${this.tasksUrl}${todo.id}`;
    this.headers.append('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: this.headers } );
    let params: URLSearchParams = this.serialize( todo );

    return this.http
      .put( url, params, options )
      .toPromise()
      .then( () => todo )
      .catch( this.handleError );
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
