// Wir importieren unsere Express-Anwendung
// aus der app.ts Datei.
import app from "./app.js";

// Der Port, auf dem unser Backend laufen soll.
//
// 3000 ist für lokale Entwicklung ein sehr üblicher Port.
const PORT = 3000;

// Wir starten den HTTP Server.
//
// app.listen() sorgt dafür,
// dass unser Backend tatsächlich auf Anfragen wartet.
app.listen(PORT, () => {
  // Diese Funktion wird ausgeführt,
// sobald der Server erfolgreich gestartet wurde.
  console.log(`Server läuft auf http://localhost:${PORT}`);
});