import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo, TodosService } from "./TodosService";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  todoTitle = "";
  loading = false;
  error = "";

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  completeTodo(id: number) {
    this.todosService.completeTodo(id).subscribe(todo => {
      this.todos.find(t => t.id === todo.id).completed = true;
    });
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }
    this.todosService
      .addTodo({
        title: this.todoTitle,
        completed: false
      })
      .subscribe(todo => {
        this.todos.push(todo);
        this.todoTitle = "";
      });
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }

  fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos().subscribe(
      response => {
        this.todos = response;
        this.loading = false;
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
