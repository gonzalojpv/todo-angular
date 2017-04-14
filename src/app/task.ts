export class Task {
  id: number;
  user_id: number;
  title: string = '';
  complete: any = false;

  constructor( values: Object = {} ) {
    Object.assign( this, values );
  }
}
