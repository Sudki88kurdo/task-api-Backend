// Express Router importieren
import { Router } from "express";

// Controller importieren
import {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

// Einen Router erstellen
const router = Router();

// GET /tasks
// Alle Tasks abrufen
router.get("/", getTasks);

// POST /tasks
// Einen neuen Task erstellen
router.post("/", createTask);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
// Router exportieren
export default router;