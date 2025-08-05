import { data } from "../database/todo.database.json";

interface ITodo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export class TodoService {
  private todos: ITodo[] = data;
  private idCounter: number;

  constructor() {
    let maxId = 0;
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id > maxId) {
        maxId = this.todos[i].id;
      }
    }
    this.idCounter = maxId + 1;
  }

  public getAllTodos(search?: string, filter?: string) {
    let result = [...this.todos];

    if (search) {
      result = result.filter((todo: ITodo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "isCompleted") {
      result = result.filter((todo: ITodo) => todo.isCompleted);
    }

    return result;
  }

  public getTodoById(id: number) {
    const todo = this.todos.find((todo: ITodo) => todo.id === id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    return todo;
  }

  public createTodo(body: { title: string; description: string }) {
    const newTodo: ITodo = {
      id: this.idCounter++,
      title: body.title,
      description: body.description,
      isCompleted: false,
    };

    this.todos.push(newTodo);

    return newTodo;
  }

  public updateTodo(
    id: number,
    body: { title: string; description: string; isCompleted: boolean }
  ) {
    // cari todo yang idnya sama dengan id
    const todoIndex = this.todos.findIndex((todo: ITodo) => todo.id === id);

    // jika todo tidak ditemukan
    if (todoIndex === -1) {
      throw new Error("Todo not found");
    }

    // update todo
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      title: body.title,
      description: body.description,
      isCompleted: body.isCompleted,
    };

    // return todo yang sudah diupdate
    return this.todos[todoIndex];
  }

  public deleteTodo(id: number) {
    const todoIndex = this.todos.findIndex((todo: ITodo) => todo.id === id);

    if (todoIndex === -1) {
      throw new Error("Todo not found");
    }

    this.todos.splice(todoIndex, 1);

    return this.todos;
  }
}
