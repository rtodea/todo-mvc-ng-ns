import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'tdm-todo-creator',
  moduleId: module.id,
  templateUrl: './todo-creator.component.html',
  styleUrls: ['./todo-creator.component.css']
})
export class TodoCreatorComponent implements OnInit {
  form: FormGroup;

  callToAction = 'What needs to be done?';

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      todo: new FormControl(null, [Validators.required]),
    });
  }

  create() {
    const todoText = this.form.controls.todo.value;

    this.todoService.create(todoText);
    this.form.reset();
  }

  destroy(todoId) {
    this.todoService.destroy(todoId);
  }

  handleAndroidFocus(textField, container) {
    if (container.android) {
      container.android.setFocusableInTouchMode(true);
      container.android.setFocusable(true);
      textField.android.clearFocus();
    }
  }
}
