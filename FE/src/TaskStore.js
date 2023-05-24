// TaskStore.js

import { makeAutoObservable } from "mobx";

class TaskStore {
  tasks = [
    { id: 1, name: 'Task 1', children: [] },
    { id: 2, name: 'Task 2', children: [
      { id: 3, name: 'Sub-task 1' },
      { id: 4, name: 'Sub-task 2' },
    ]},
    // ...
  ];

  constructor() {
    makeAutoObservable(this);
  }

  moveTask(dragIndex, hoverIndex) {
    // ...
  }
}

export const taskStore = new TaskStore();
