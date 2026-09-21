// Prisma Client importieren
import { prisma } from "../lib/prisma.js";

// DTO importieren
import type { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto.js";

// Alle Tasks abrufen
export async function findAllTasks() {

    // Alle Datensätze aus der Task-Tabelle holen
    const tasks = await prisma.task.findMany();

    // Ergebnis zurückgeben
    return tasks;
}

// Einen neuen Task erstellen
export async function insertTask(
    data: CreateTaskDto
) {

    // Einen neuen Datensatz in der Task-Tabelle erstellen
    const task = await prisma.task.create({

        // Daten, die in die Datenbank geschrieben werden
        data: {
            title: data.title
        }
    });

    // Den erstellten Task zurückgeben
    return task;
}

export async function updateTask(
    id: number,
    data: UpdateTaskDto
) {
    const task = await prisma.task.update({
        where: {
            id: id
        },
        data: data
    });
    return task;
}


export async function findTaskById(
    id: number
) {
    const task = await prisma.task.findUnique({
        where: {
            id: id
        }
    });
    return task;
}
