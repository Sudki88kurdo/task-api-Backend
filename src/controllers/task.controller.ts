// Express-Typen importieren
import type { Request, Response } from "express";

// Services importieren
import {
    getTasks as getTasksService,
    createTask as createTaskService,
    getTaskById as getTaskByIdService
} from "../services/task.service.js";

// Controller für GET /tasks
export async function getTasks(
    req: Request,
    res: Response
) {
    // Service aufrufen
    const tasks = await getTasksService();

    // HTTP 200 + Tasks zurückgeben
    res.status(200).json(tasks);
}

// Controller für POST /tasks
export async function createTask(
    req: Request,
    res: Response
) {
    // title aus dem Request Body holen
    const { title } = req.body;

    // Prüfen, ob title ein String ist
    if (typeof title !== "string") {
        return res.status(400).json({
            message: "title muss ein String sein"
        });
    }

    // Prüfen, ob title leer ist
    if (title.trim().length === 0) {
        return res.status(400).json({
            message: "title darf nicht leer sein"
        });
    }

    // Task erstellen
    const task = await createTaskService({
        title: title.trim()
    });

    // Erfolgreiche Erstellung
    res.status(201).json(task);


}
export async function getTaskById(
    req: Request,
    res: Response
) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "id muss eine ganze Zahl sein"
        });
    }
    const task = await getTaskByIdService(id);
    if (!task) {
        return res.status(404).json({
            message: "Task nicht gefunden"
        });
    }
    res.status(200).json(task);
}