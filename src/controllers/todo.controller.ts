import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  public async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const { search, filter } = req.query;
      const result = await this.todoService.getAllTodos(
        search as string,
        filter as string
      );

      res.status(200).send({
        message: "Todos fetched successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }

  public async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.todoService.createTodo(req.body);

      res.status(200).send({
        message: "Todo created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }

  public async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const result = await this.todoService.updateTodo(id, body);

      res.status(200).send({
        message: "Todo updated successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }

  public async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.todoService.deleteTodo(id);

      if (result) {
        res.status(200).send({
          message: "Todo deleted successfully",
        });
      } else {
        res.status(500).send({
          message: "Error deleting todo",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }

  public async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.todoService.getTodoById(id);

      res.status(200).send({
        message: "Todo fetched successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }
}
