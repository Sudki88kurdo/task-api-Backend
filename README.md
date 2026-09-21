# Task API



---

## 🛠 Tech Stack

* **Node.js** – Runtime
* **TypeScript** – Typsicherheit
* **Express** – HTTP/Web-FrameworkS
* **PostgreSQL** – relationale Datenbank
* **Prisma** – ORM für den Datenbankzugriff
* **Git / GitHub** – Versionskontrolle und Hosting

---

## 🏗 Architektur

Das Projekt verwendet eine Layered Architecture:

```text
Client
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
PostgreSQL
```

### Verantwortlichkeiten

| Layer      | Aufgabe                               |
| ---------- | ------------------------------------- |
| Route      | URL und HTTP-Methode definieren       |
| Controller | Request/Response und HTTP-Statuscodes |
| Service    | Business Logic                        |
| Repository | Datenbankzugriff                      |
| Prisma     | ORM / Kommunikation mit PostgreSQL    |
| PostgreSQL | Speicherung der Daten                 |

Diese Trennung sorgt dafür, dass die einzelnen Verantwortlichkeiten nicht vermischt werden.

---

## 📁 Projektstruktur

```text
task-api/
│
├── prisma/
│   ├── migrations/
│   │   └── ...
│   └── schema.prisma
│
├── generated/
│   └── prisma/
│
├── src/
│   ├── controllers/
│   │   └── task.controller.ts
│   │
│   ├── dtos/
│   │   └── task.dto.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── repositories/
│   │   └── task.repository.ts
│   │
│   ├── routes/
│   │   └── task.routes.ts
│   │
│   ├── services/
│   │   └── task.service.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── prisma.config.ts
├── README.md
└── tsconfig.json
```

---

# 🚀 Installation

## 1. Repository klonen

```bash
git clone <DEINE-GITHUB-URL>
cd task-api
```

---

## 2. Dependencies installieren

```bash
npm install
```

---

# 🗄 PostgreSQL einrichten

Für das Projekt wird eine PostgreSQL-Datenbank benötigt.

Erstelle eine Datenbank, zum Beispiel:

```text
task_api
```

Die Verbindungsinformationen werden über eine `.env` Datei bereitgestellt.

---

## 🔐 Environment Variables

Erstelle im Root-Verzeichnis eine Datei:

```text
.env
```

Beispiel:

```env
DATABASE_URL="postgresql://postgres:DEIN_PASSWORT@localhost:5432/task_api"
```

**Wichtig:** Die `.env` Datei darf nicht zu GitHub hochgeladen werden.

Sie enthält sensible Zugangsdaten.

---

# 🔧 Prisma einrichten

Nach dem Erstellen der Datenbank müssen die Prisma-Migrationen ausgeführt werden.

```bash
npx prisma migrate dev
```

Danach den Prisma Client generieren:

```bash
npx prisma generate
```

---

# ▶️ Projekt starten

Development local Prisma Postgre und Server starten:

```bash
npx prisma dev            
npm run dev        -->  neue Terminal
```

Der Server läuft anschließend unter:

```text
http://localhost:3000
```

---

# 📡 API

Die Task API verwendet aktuell den Prefix:

```text
/tasks
```

## GET – alle Tasks

```http
GET /tasks
```

Beispiel:

```bash
curl http://localhost:3000/tasks
```

---

## POST – Task erstellen

```http
POST /tasks
Content-Type: application/json
```

Request Body:

```json
{
  "title": "Prisma lernen"
}
```

Beispiel mit curl:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Prisma lernen"}'
```

Bei erfolgreicher Erstellung wird HTTP `201 Created` zurückgegeben.

---

## GET – einzelnen Task abrufen

```http
GET /tasks/:id
```

Beispiel:

```http
GET /tasks/1
```

---

## PATCH – Task aktualisieren

Geplant:

```http
PATCH /tasks/:id
```

---

## DELETE – Task löschen

Geplant:

```http
DELETE /tasks/:id
```

---

# 📊 Task Model

Das aktuelle Prisma Model:

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Eine Task besitzt:

| Feld        | Typ        | Beschreibung         |
| ----------- | ---------- | -------------------- |
| `id`        | `Int`      | Eindeutige ID        |
| `title`     | `String`   | Titel der Task       |
| `completed` | `Boolean`  | Status der Task      |
| `createdAt` | `DateTime` | Erstellungszeitpunkt |
| `updatedAt` | `DateTime` | Letzte Änderung      |

---

# 🧠 Fehlerbehandlung

Die API verwendet HTTP-Statuscodes, um das Ergebnis einer Anfrage zu beschreiben.

Beispiele:

```text
200 OK
```

Request erfolgreich.

```text
201 Created
```

Eine neue Ressource wurde erstellt.

```text
400 Bad Request
```

Die Anfrage enthält ungültige Daten.

```text
404 Not Found
```

Die angeforderte Ressource existiert nicht.

```text
500 Internal Server Error
```

Unerwarteter Serverfehler.

---

# 🧪 Entwicklung

Das Projekt wird schrittweise erweitert.

Geplante CRUD-Endpunkte:

```text
GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

Weitere mögliche Erweiterungen:

* Input Validation
* zentrale Error Middleware
* Pagination
* Filtering
* Sorting
* Authentication
* Authorization
* API Versioning
* Tests
* Logging
* Docker
* Deployment

---

# 🔄 Datenbank-Migrationen

Wenn das Prisma Schema geändert wird:

```bash
npx prisma migrate dev --name <migration-name>
```

Beispiel:

```bash
npx prisma migrate dev --name add_priority
```

Danach:

```bash
npx prisma generate
```

Migrationen werden im Ordner gespeichert:

```text
prisma/migrations/
```

---

# 🌱 Git Workflow

Änderungen überprüfen:

```bash
git status
```

Dateien hinzufügen:

```bash
git add .
```

Commit erstellen:

```bash
git commit -m "feat: add task api"
```

Änderungen zu GitHub übertragen:

```bash
git push
```

---

# 📋 Git Commit Beispiele

Für neue Features:

```bash
git commit -m "feat: add task creation"
```

Für Fehlerbehebungen:

```bash
git commit -m "fix: validate task title"
```

Für Dokumentation:

```bash
git commit -m "docs: update README"
```

Für Refactoring:

```bash
git commit -m "refactor: separate repository layer"
```

---

# 🔒 Sicherheit

Folgende Dateien dürfen **nicht** in das öffentliche Repository:

```text
.env
```

Insbesondere dürfen keine Datenbank-Passwörter, API Keys oder andere Secrets in Git committed werden.

Die `.gitignore` sollte deshalb mindestens enthalten:

```gitignore
node_modules/
.env
.env.*
!.env.example

generated/
dist/
coverage/
```

---

# 📚 Lernziele

Mit diesem Projekt werden unter anderem folgende Backend-Konzepte gelernt:

* REST API
* HTTP Methods
* HTTP Status Codes
* Express
* TypeScript
* DTOs
* Middleware
* Layered Architecture
* Service Layer
* Repository Pattern
* PostgreSQL
* SQL
* Prisma ORM
* Database Migrations
* CRUD
* Input Validation
* Error Handling
* Git
* GitHub

---

# 👨‍💻 Projektstatus

Das Projekt befindet sich in aktiver Entwicklung.

Aktuell implementiert:

* [x] Express Server
* [x] TypeScript
* [x] PostgreSQL
* [x] Prisma
* [x] Layered Architecture
* [x] GET `/tasks`
* [x] POST `/tasks`
* [ ] GET `/tasks/:id`
* [ ] PATCH `/tasks/:id`
* [ ] DELETE `/tasks/:id`
* [ ] zentrale Error Middleware
* [ ] Tests
* [ ] Authentication
* [ ] Deployment

---

## License

Dieses Projekt dient aktuell als Lern- und Portfolio-Projekt.
