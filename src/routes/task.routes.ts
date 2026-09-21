// Express Router importieren
import { Router } from "express";

// Controller importieren
import {
    getTasks,
    createTask
} from "../controllers/task.controller.js";

// Einen Router erstellen
const router = Router();

// GET /tasks
// Alle Tasks abrufen
router.get("/", getTasks);

// POST /tasks
// Einen neuen Task erstellen
router.post("/", createTask);

// Router exportieren
export default router;