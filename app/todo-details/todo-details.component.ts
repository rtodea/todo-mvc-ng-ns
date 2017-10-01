import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from "@angular/router";

import { TodoItem, TodoService } from '../todo.service';

@Component({
  selector: 'tdm-todo-listing',
  moduleId: module.id,
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnDestroy {
  todo: TodoItem;

  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private todoService: TodoService) {
    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      console.dir(params);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
}
