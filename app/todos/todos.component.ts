import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'tdm-todos',
  moduleId: module.id,
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  setFilter(filter) {
    this.todoService.setFilter(filter);
  }
}