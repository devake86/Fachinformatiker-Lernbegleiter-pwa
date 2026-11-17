# Fachinformatiker Lernbegleiter PWA

Plattformunabhängige Weiterentwicklung des Fachinformatiker Lernbegleiters als Progressive Web App.

Die Anwendung soll vorhandene Lernfragen aus den Java-basierten Desktop- und Android-Versionen übernehmen und eine responsive, installierbare sowie offlinefähige Nutzung ermöglichen.

## Live-Demo

Der aktuelle Entwicklungsstand ist über GitHub Pages erreichbar:

https://devake86.github.io/Fachinformatiker-Lernbegleiter-pwa/

## Aktueller Stand

### v0.6-dev

Bedienbarer Quizdurchlauf mit Antwortauswertung und Rundenergebnis.

- **M6:** Quizansicht und vollständiger Quizdurchlauf
- Test Quizrunden mit drei zufällig ausgewählten Fragen
- gemischte Reihenfolge der Antwortmöglichkeiten
- Auswahl und Bestätigung einer Antwort
- farbliche Kennzeichnung richtiger und falsch gewählter Antworten
- Anzeige der zugehörigen Erklärung
- Fortschrittsanzeige und Fragen-ID
- Navigation zwischen den Fragen
- Ergebnisanzeige am Ende der Quizrunde
- Abbruch und Rückkehr zur Fragenkategorieauswahl
- manuelle Akzeptanztests sowie automatisierte Regressionstests der Kernlogik

### v0.5-dev

Erzeugung gemischter und begrenzter Quizrunden aus den geladenen Fragenbeständen.

- **M5:** QuizEngine und Rundenerzeugung
- gleichmäßige Round-Robin-Auswahl aus mehreren Fragenpools
- Begrenzung auf maximal 20 verfügbare Fragen
- Unterstützung kleiner Fragenbestände mit weniger als 20 Fragen
- Vermeidung doppelter Fragen innerhalb einer Runde
- Erhalt der unveränderten Ausgangspools
- automatisierte Tests für Array-Mischung, Rundenerzeugung und QuizEngine
- Ausführung der Tests vor dem GitHub-Pages-Deployment

### v0.4-dev

Funktionsfähiges Laden und Validieren der vorhandenen Fragenbestände.

- **M4:** TypeScript-Datenmodelle für Fragen und Antworten
- asynchrones Laden einzelner und mehrerer JSON-Fragendateien
- Zusammenführung mehrerer Dateien zu einer gemeinsamen Fragenliste
- Prüfung der JSON-Syntax und der erwarteten Datenstruktur
- verständliche Fehlerbehandlung bei fehlenden oder ungültigen Dateien
- zentrale Versionsanzeige

### v0.3-dev

Zentrale Verwaltung der vorhandenen Fragenbestände.

- **M3:** Zuordnung der Lernfelder und Fragenkategorien zu den vorhandenen JSON-Fragendateien
- zentrale Ablösung der mehrfach hinterlegten Dateilisten
- überprüfbare Anzeige der zugeordneten Fragendateien

### v0.2-dev

Funktionsfähige Menüführung und Inhaltsauswahl.

- **M2:** Navigation zwischen Hauptmenü, Lernfeldauswahl und Fragenkategorieauswahl
- zentrale Verwaltung der verfügbaren Lernfelder und Kategorien
- dynamische Anzeige der zum jeweiligen Lernfeld gehörenden Fragenkategorien
- responsive Darstellung in hellem und dunklem Farbschema

### v0.1-prototype

Früher Prototyp der Benutzeroberfläche und Projektgrundlage.

- **M1:** Einrichtung des Vite-/TypeScript-Projekts
- responsive Hauptmenüansicht
- persistente Hell-/Dunkelumschaltung
- Git-Versionsverwaltung
- automatischer Build und Bereitstellung über GitHub Pages

## Geplante Funktionen

- lokale Speicherung des Lernfortschritts
- Wiederholung falsch beantworteter Fragen
- separates Fehlertraining
- responsive Bedienung auf Desktop- und Mobilgeräten
- Offline-Nutzung und automatische Updateerkennung

## Technologien

- Vanilla TypeScript
- Vite
- HTML
- CSS

## Entwicklungsstand

Das Projekt befindet sich in der frühen Entwicklungsphase.
