import { Component, OnInit } from '@angular/core';
import { TodoService, TodoItem } from '../todo.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'tdm-todo-counter',
  templateUrl: './todo-counter.component.html',
  moduleId: module.id,
  styleUrls: ['./todo-counter.component.css']
})
export class TodoCounterComponent implements OnInit {
  activeTodos = 0;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.todosObservable
        .map((todos: TodoItem[]) => todos.filter((todo: TodoItem) => !todo.done))
        .subscribe((activeTodos) => { this.activeTodos = activeTodos.length; });
  }
}
