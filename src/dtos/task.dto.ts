// Daten, die beim Erstellen eines Tasks
// vom Client akzeptiert werden.
export interface CreateTaskDto {

    // Der neue Task benötigt einen Titel
    title: string;
}

// Daten, die beim Aktualisieren eines Tasks akzeptiert werden
export interface UpdateTaskDto {
    // title ist optional,
    // weil der Client auch nur completed ändern darf.
    title?: string;

    // completed ist ebenfalls optional.
    completed?: boolean;
}