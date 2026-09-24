// Eigener Fehler für Fehler,
// die wir kontrolliert an den Client zurückgeben wollen.
export class AppError extends Error {
    // HTTP-Statuscode, z. B. 400, 404 oder 409
    statusCode: number;

    constructor(
        message: string,
        statusCode: number
    ) {
        // Übergibt die Fehlermeldung an Error
        super(message);

        // Speichert den HTTP-Statuscode
        this.statusCode = statusCode;

        // Gibt dem Fehler einen eindeutigen Namen
        this.name = "AppError";
    }
}