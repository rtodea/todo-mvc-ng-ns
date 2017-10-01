import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import * as Camera from 'nativescript-camera';
import * as ImagePicker from 'nativescript-imagepicker';


import { TodoItem, TodoService } from '../todo.service';

@Component({
  selector: 'tdm-todo-details',
  moduleId: module.id,
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnDestroy {
  todo: TodoItem;

  picture;

  attachments;

  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private todoService: TodoService) {
    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      this.todo = this.todoService.read(params.id);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  takePicture() {
    Camera.requestPermissions();
    Camera.takePicture().then((imageAsset) => {
      // const image = new Image();
      // image.src = imageAsset;
      // this.picture = image;
      this.picture = imageAsset;
    });
  }

  attachPicture() {
    const context = ImagePicker.create({ mode: 'single' });
    context
      .authorize()
      .then(() => {
        return context.present();
      })
      .then((selection) => {
        selection.forEach((selected) => {
          // process the selected image
          console.dir(selected);
        });
        this.attachments = selection;
      }).catch((error) => {
        console.log(error);
    });
  }
}
