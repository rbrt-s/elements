# Integrate with Angular ([example-angular](https://gitlab.inovex.de/inovex-elements/example-angular))

This instructions are based on angular v6.1.6 and angular-cli 6.1.5.

## Prerequisites

You setup your angular project with [angular-cli](https://cli.angular.io/).

## Prepare your project

First of all you should make sure your current setup without the components work. If that's the case you can start preparing.

### 0) Setup your environment

Follow the introduction instructions to configure your npm registry and add the latest `@inovex/elements-angular` version to your project.

### 1) Import component loader and allow custom elements

The Angular Directives needed to use elements in
components are bundled into the `InoElementsModule`.

You have to add integrate it into your `AppModule`:


```typescript
// src/app/app.module.js

// ...
import {InoElementsModule} from '@inovex/elements-angular';

@NgModule({
  // ...
  imports: [InoElementsModule]
})
export class AppModule {}
// ...
```

### 2) Use the components

You can use the components now in your Angular project in the same way as you would use any native HTML elements.

Here is an example of how to use an inovex element in a component:

```ts
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Array<Todo>;
  name: string;

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getRandomTodos();
  }

  onValueChanged($event: any) {
    this.name = $event.target.value;
  }

  add() {
    this.todos.push(new Todo(this.name));
    this.name = '';
  }
}
```

with the corresponding template:

```html
<!--- app.component.html -->

<ino-input
  ino-icon="add"
  ino-icon-clickable
  ino-icon-trailing
  (inoIconClicked)="add()"
  type="text"
  [value]="name"
  (input)="onValueChanged($event)"
  ino-label="What needs to be done..."
>
</ino-input>

<ul class="todos">
  <li *ngFor="let todo of todos; index as i">
    {{ todo.name }} <ino-button (click)="delete(i, todo)">Delete</ino-button>
  </li>
</ul>
```