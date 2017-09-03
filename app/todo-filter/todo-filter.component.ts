import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export enum FilterType {
  All,
  Active,
  Completed,
}

export interface TodoFilter {
  isActive: boolean;
  label: string;
  type: FilterType;
}

@Component({
  selector: 'tdm-todo-filter',
  templateUrl: './todo-filter.component.html',
  moduleId: module.id,
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit {
  @Output() filterUpdated = new EventEmitter<FilterType>();

  filters: TodoFilter[] = [
    {
      label: 'Active',
      type: FilterType.Active,
      isActive: false,
    },
    {
      label: 'Completed',
      type: FilterType.Completed,
      isActive: false,
    },
    {
      label: 'All',
      type: FilterType.All,
      isActive: true,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  setFilter(activeFilter: TodoFilter) {
    this.filterUpdated.emit(activeFilter.type);
    this.filters.forEach((filter) => {
      filter.isActive = (filter.type === activeFilter.type);
    });
  }
}
