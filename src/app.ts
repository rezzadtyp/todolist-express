import cors from "cors";
import express, { Express, Request, Response } from "express";
import { PORT } from "./config";
import { TodoRoutes } from "./routers/todo.router";
import { errorMiddleware } from "./middlewares/error.middleware";

export class App {
  app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private configure() {
    this.app.use(
      cors({
        allowedHeaders: ["Content-Type", "Authorization"],
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );
    this.app.use(express.json());
  }

  private routes() {
    const todoRouter = new TodoRoutes();

    this.app.get("/", (req: Request, res: Response) => res.send("Hello World"));
    this.app.use("/todos", todoRouter.getRouter());
  }

  private errorHandler() {
    this.app.use(errorMiddleware);
  }

  public start() {
    this.app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`)
    );
  }
}
