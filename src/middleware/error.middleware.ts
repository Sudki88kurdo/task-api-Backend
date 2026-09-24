import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import { AppError } from "../errors/app-error.js";


// Zentrale Fehlerbehandlung
export function errorMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Fehler zunächst auf dem Server ausgeben
    console.error(error);

    // Prüfen, ob es unser eigener AppError ist
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }


    // Prisma-Fehler
    if (error instanceof Prisma.PrismaClientKnownRequestError) {

        // P2025 = angeforderter Datensatz existiert nicht
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Task nicht gefunden"
            });
        }
    }



    // Jeder unbekannte Fehler wird zu HTTP 500
    return res.status(500).json({
        message: "Interner Serverfehler"
    });
}