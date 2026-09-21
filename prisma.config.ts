// Lädt Variablen aus unserer .env-Datei
import "dotenv/config";

// Prisma-Konfigurationsfunktionen importieren
import { defineConfig, env } from "prisma/config";

// Prisma-Konfiguration exportieren
export default defineConfig({

  // Wo befindet sich unser Prisma Schema?
  schema: "prisma/schema.prisma",

  // Wo sollen Migrationen gespeichert werden?
  migrations: {
    path: "prisma/migrations",
  },

  // Datenbankverbindung
  datasource: {
    // DATABASE_URL aus .env lesen
    url: env("DATABASE_URL"),
  },
});