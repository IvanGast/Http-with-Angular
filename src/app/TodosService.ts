import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { delay, catchError, map, tap } from "rxjs/operators";

export interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}

@Injectable({ providedIn: "root" })
export class TodosService {
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(
      "https://jsonplaceholder.typicode.com/todos",
      todo,
      {
        headers: new HttpHeaders("application/json")
      }
    );
  }

  fetchTodos(): Observable<Todo[]> {
    let params = new HttpParams();
    params = params.append("_limit", "3");

    return this.http
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        params,
        observe: "response"
      })
      .pipe(
        map(response => {
          return response.body;
        }),
        delay(1500),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  removeTodo(id: number): Observable<any> {
    return this.http
      .delete<any>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        observe: "events"
      })
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Sent) {
            console.log("SENT", event);
          }
          if (event.type === HttpEventType.Response) {
            console.log("RESPONSE", event);
          }
        })
      );
  }

  completeTodo(id: number): Observable<Todo> {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed: true },
      { responseType: "json" }
    );
  }
}
