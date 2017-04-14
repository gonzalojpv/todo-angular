import { Component, OnInit } from '@angular/core';
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
  todos: Task[];

  constructor( private taskDataService: TaskService ) {
    this.todos = [];
  }

  addTodo() {
    this.taskDataService.addTask( this.newTask );
    this.newTask = new Task();
  }

  toggleTodoComplete( todo ) {
    console.log('toggleTodoComplete');
  }

  removeTodo( todo ) {
    console.log('removeTodo');
  }

  getTasks(): void {
    this.taskDataService
        .getTasks()
        .then(todos => {
          this.todos = todos;
        });
  }

  ngOnInit(): void {
    this.getTasks();
  }

}
