import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { TodosComponent } from './todos/todos.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/items', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'items', component: TodosComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }