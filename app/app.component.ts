import { Component, OnInit } from '@angular/core';
import { BackendService } from './shared/backend.service';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    console.log('AppComponent.onInit');
    this.backendService.init();
  }
}
