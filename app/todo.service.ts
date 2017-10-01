import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FilterType } from './todo-filter/todo-filter.component';

export class TodoItem implements TodoItem {

  id: string;
  text: string;
  done: boolean;

  constructor(todoText) {
    this.id = this.generateUniqueId();
    this.text = todoText;
    this.done = false;
  }

  private generateUniqueId() {
    return TodoService.guid();
  }
}

export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

export interface UploadTodoItem {
  text?: string;
  done?: boolean;
}

@Injectable()
export class TodoService {
  private todosById = new Map<string, TodoItem>();

  private todos$ = new Subject<TodoItem[]>();

  private filteredTodos$ = new Subject<TodoItem[]>();

  private activeFilter = FilterType.All;

  todosSnapshot: TodoItem[] = [];

  filteredTodosSnapshot: TodoItem[] = [];

  todosObservable = this.todos$.asObservable();

  filteredTodosObservable = this.filteredTodos$.asObservable();

  public static guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  private getFilteredTodos(filter: FilterType) {
    const filters = {
      [FilterType.All]: (todos) => (todos),
      [FilterType.Completed]: (todos) => (todos.filter((todo) => todo.done)),
      [FilterType.Active]: (todos) => (todos.filter((todo) => !todo.done)),
    };

    return filters[filter](this.todosSnapshot);
  }

  constructor() {
    this.todosObservable.subscribe(() => {
      this.filteredTodosSnapshot = this.getFilteredTodos(this.activeFilter);
      this.filteredTodos$.next(this.filteredTodosSnapshot);
    });
  }

  load(todos) {
    this.todosSnapshot = todos;
    todos.forEach((todo) => {
      this.todosById.set(todo.id, todo);
    });

    this.todos$.next(todos);
  }

  create(todoText: string) {
    const todoItem = new TodoItem(todoText);

    this.todosSnapshot.push(todoItem);
    this.todosById.set(todoItem.id, todoItem);
    this.todos$.next(this.todosSnapshot);

    return todoItem;
  }

  destroy(todoId: string) {
    this.todosSnapshot = this.todosSnapshot.filter((todo) => todo.id !== todoId);
    this.todosById.delete(todoId);
    this.todos$.next(this.todosSnapshot);
  }

  update(todoId: string, payload: UploadTodoItem) {
    const foundTodo = this.todosById.get(todoId);
    Object.assign(foundTodo, payload);
    this.todos$.next(this.todosSnapshot);
  }

  read(todoId: string) {
    return this.todosById.get(todoId);
  }

  setFilter(filter: FilterType) {
    this.activeFilter = filter;
    this.filteredTodosSnapshot = this.getFilteredTodos(this.activeFilter);
    this.filteredTodos$.next(this.filteredTodosSnapshot);
    console.log('setting filter:');
    console.dir(this.filteredTodosSnapshot);
  }

  getFilter() {
    return this.activeFilter;
  }
}
