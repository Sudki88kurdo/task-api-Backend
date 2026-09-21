// Lädt Variablen aus der .env-Datei.
// Dadurch steht process.env.DATABASE_URL zur Verfügung.
import "dotenv/config";

// PostgreSQL-Adapter von Prisma importieren.
// Dieser verbindet Prisma mit PostgreSQL.
import { PrismaPg } from "@prisma/adapter-pg";

// Unser von Prisma generierter PrismaClient.
// Wichtig: Bei ESM + NodeNext schreiben wir .js,
// obwohl die Quelldatei TypeScript ist.
import { PrismaClient } from "../generated/prisma/client.js";

// Die DATABASE_URL aus unserer .env-Datei holen.
const connectionString = process.env.DATABASE_URL;

// Prüfen, ob überhaupt eine Datenbank-URL vorhanden ist.
if (!connectionString) {
    throw new Error("DATABASE_URL fehlt in der .env-Datei");
}

// PostgreSQL-Adapter erstellen.
// Der Adapter weiß, wie Prisma mit PostgreSQL kommunizieren soll.
const adapter = new PrismaPg({
    connectionString,
});

// Eine zentrale PrismaClient-Instanz erstellen.
const prisma = new PrismaClient({
    adapter,
});

// Unsere Prisma-Instanz exportieren.
// Repositorys können sie anschließend importieren.
export { prisma };