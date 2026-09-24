// Express-Typen importieren
import type { Request, Response } from "express";
import { AppError } from "../errors/app-error.js";

// Services importieren
import {
    getTasks as getTasksService,
    createTask as createTaskService,
    getTaskById as getTaskByIdService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService
} from "../services/task.service.js";

import e from "express";

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

//__________________________________________________________________

// Controller für POST /tasks
export async function createTask(
    req: Request,
    res: Response
) {
    // title aus dem Request Body holen
    const { title, completed } = req.body;

    // Prüfen, ob title ein String ist
    if (typeof title !== "string") {
        throw new AppError("title muss ein String sein", 400);
    }

    // Prüfen, ob title leer ist
    if (title.trim().length === 0) {
        throw new AppError("title darf nicht leer sein", 400);
    }
    // Wenn completed angegeben wurde,
    // muss es ein Boolean sein
    if (
        completed !== undefined && typeof completed !== "boolean"
    ) {
        throw new AppError("completed muss ein Boolean (true or false) sein", 400);
    }
    // Task erstellen
    const task = await createTaskService({
        title: title.trim(), completed
    });

    // Erfolgreiche Erstellung
    res.status(201).json(task);


}

//__________________________________________________________________

export async function getTaskById(
    req: Request,
    res: Response
) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        throw new AppError("id muss eine ganze Zahl sein", 400);
    }

    const task = await getTaskByIdService(id);
    if (!task) {

        throw new AppError("Task nicht gefunden", 404);
    }
    res.status(200).json(task);
}

//__________________________________________________________________

// PATCH /tasks/:id
// Aktualisiert einen bestehenden Task
export async function updateTask(
    req: Request,
    res: Response
) {
    // ID aus der URL lesen.
    const id = Number(req.params.id);

    // Prüfen, ob die ID eine gültige ganze Zahl ist.
    if (!Number.isInteger(id)) {
        throw new AppError("id muss eine ganze Zahl sein", 400);
    }

    // Daten aus dem Request Body lesen.
    const { title, completed } = req.body;

    // Prüfen, ob mindestens ein Feld gesendet wurde.
    if (
        title === undefined &&
        completed === undefined
    ) {
        throw new AppError("Mindestens ein Feld muss angegeben werden", 400);
    }

    // title validieren, falls es vorhanden ist.
    if (
        title !== undefined &&
        typeof title !== "string"
    ) {
        throw new AppError("title muss ein String sein", 400);
    }

    // title darf nicht leer sein.
    if (
        title !== undefined &&
        title.trim().length === 0
    ) {
        throw new AppError("title darf nicht leer sein", 400);
    }

    // completed validieren, falls es vorhanden ist.
    if (
        completed !== undefined &&
        typeof completed !== "boolean"
    ) {
        throw new AppError("completed muss ein Boolean sein", 400);
    }



    // Nur validierte Daten an den Service weitergeben.
    const task = await updateTaskService(id, {
        ...(title !== undefined && {
            title: title.trim()
        }),

        ...(completed !== undefined && {
            completed
        })
    });

    // Aktualisierten Task zurückgeben.
    res.status(200).json(task);
}

//__________________________________________________________________

export async function deleteTask(
    req: Request,
    res: Response
) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        throw new AppError("id muss eine ganze Zahl sein", 400);
    }


    // Wenn die ID nicht existiert, wirft Prisma momentan einen Fehler
    await deleteTaskService(id);

    // 204 = erfolgreich gelöscht, aber kein Response-Body
    res.status(204).send();
}