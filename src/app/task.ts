export class Task {
  id: number;
  user_id: number;
  title: string = '';
  complete: boolean = false;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
