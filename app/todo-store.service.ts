import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { StoreService } from './store.service';

@Injectable()
export class TodoStoreService {
  TODO_STORE_KEY = 'todos';

  constructor(todoService: TodoService, storeService: StoreService) {
    todoService.todosObservable.subscribe((todos) => {
      storeService.setItem(this.TODO_STORE_KEY, todos);
    });

    const storedTodos = storeService.getItem(this.TODO_STORE_KEY);
    if (storedTodos) {
      todoService.load(storedTodos);
    }
  }
}
