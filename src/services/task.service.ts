// Repository-Funktionen importieren
import {
    findAllTasks,
    insertTask
} from "../repositories/task.repository.js";

// DTO importieren
import type { CreateTaskDto } from "../dtos/task.dto.js";

// Service für GET /tasks
export async function getTasks() {

    // Daten aus dem Repository holen
    const tasks = await findAllTasks();

    // Hier könnte Business Logic stattfinden
    return tasks;
}

// Service für POST /tasks
export async function createTask(data: CreateTaskDto) {

    // Hier könnten Business-Regeln stehen.
    //
    // Zum Beispiel:
    // - Titel darf nicht doppelt vorkommen
    // - Benutzer muss berechtigt sein
    // - Titel muss bestimmte Regeln erfüllen

    // Repository aufrufen
    const task = await insertTask(data);

    // Erstellte Task zurückgeben
    return task;
}