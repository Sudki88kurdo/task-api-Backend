// Express importieren.
import express from "express";

// Unseren Task-Router importieren.
// Pfad korrigiert, falls die Datei "tasks.routes" heißt.
import taskRouter from "./routes/task.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";



// Express-Anwendung erstellen.
const app = express();

// JSON Middleware aktivieren.
// Dadurch kann Express JSON Request Bodies lesen.
app.use(express.json());

// Alle Requests, die mit /tasks beginnen,
// werden an unseren Task Router weitergeleitet.
//
// Beispiel:
//
// GET /tasks
//        ↓
// taskRouter
//
// POST /tasks
//         ↓
// taskRouter
app.use("/tasks", taskRouter);

// Error Middleware MUSS nach den Routes kommen
app.use(errorMiddleware);

// App exportieren.
export default app;