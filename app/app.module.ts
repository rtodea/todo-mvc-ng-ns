import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoCreatorComponent } from './todo-creator/todo-creator.component';
import { TodoListingComponent } from './todo-listing/todo-listing.component';
import { TodoCounterComponent } from './todo-counter/todo-counter.component';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';
import { TodoService } from './todo.service';
import { StoreService } from './store.service';
import { TodoStoreService } from './todo-store.service';
import { TodosComponent } from './todos/todos.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from 'nativescript-angular/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoCreatorComponent,
    TodoListingComponent,
    TodoCounterComponent,
    TodoFilterComponent,
    TodosComponent,
    TodoDetailsComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    TodoService,
    StoreService,
    TodoStoreService,
  ],
  bootstrap: [
    AppComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
}
