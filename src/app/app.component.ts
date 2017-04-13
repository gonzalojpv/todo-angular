import { Component } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TaskService]
})
export class AppComponent {
  title = 'app works!';
  newTask: Task = new Task();

  constructor( private taskDataService: TaskService ) {

  }

  addTodo() {
    console.log('Here');
    this.taskDataService.addTask( this.newTask );
    this.newTask = new Task();
  }
}
