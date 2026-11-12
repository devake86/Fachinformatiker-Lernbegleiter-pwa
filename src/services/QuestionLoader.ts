import type { QuizAnswer } from "../models/QuizAnswer.ts";
import type { QuizQuestion } from "../models/QuizQuestion.ts";

export class QuestionLoader {
    public async loadQuestionFiles(questionFiles: readonly string[]): Promise<QuizQuestion[]> { // Nach erfolgreichem Laden steht eine Liste aus Quizfragen bereit
        const loadedQuestionLists = await Promise.all(questionFiles.map((questionFile) => this.loadQuestionFile(questionFile))); // Warten bis alle Ladevorgänge abgeschlossen sind

        return loadedQuestionLists.flat(); // Aus Liste mit Listen der Fragen aus den einzelnen Dateien eine gemeinsame Liste erzeugen
    }

    private async loadQuestionFile(questionFile: string): Promise<QuizQuestion[]> {
        const questionFileUrl = `${import.meta.env.BASE_URL}${questionFile}`; // GitHub-Pages Pfad
        const response = await fetch(questionFileUrl);

        if (!response.ok) {
            throw new Error(`Die Fragendatei konnte nicht geladen werden: ${questionFile}`); // HTTP-Fehler
        }

        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
            throw new Error(`Die Fragendatei wurde nicht gefunden oder ist keine JSON-Datei: ${questionFile}`); // HTML oder anderer Dateityp statt JSON
        }

        let jsonData: unknown;

        try {
            jsonData = await response.json();
        } catch {
            throw new Error(`Die Fragendatei enthält kein gültiges JSON: ${questionFile}`); // Syntaktisch defektes JSON
        }

        if (!this.isQuizQuestionArray(jsonData)) {
            throw new Error(`Die Fragendatei besitzt eine ungültige Struktur: ${questionFile}`); // Gültiges JSON mit falschen Feldern
        }

        return jsonData
    }

    private isQuizQuestionArray(value: unknown): value is QuizQuestion[] {
        return Array.isArray(value) && value.every((question) => this.isQuizQuestion(question));
    }

    private isQuizQuestion(value: unknown): value is QuizQuestion {
        if (!this.isRecord(value)) {
            return false;
        }

        return typeof value.id === 'string'
            && typeof value.question === 'string'
            && Array.isArray(value.answers)
            && value.answers.length > 0
            && value.answers.every((answer) => this.isQuizAnswer(answer))
            && typeof value.explanation === 'string';
    }

    private isQuizAnswer(value: unknown): value is QuizAnswer {
        if (!this.isRecord(value)) {
            return false;
        }

        return typeof value.text === 'string'
            && typeof value.correct === 'boolean';
    }

    private isRecord(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object'
            && value !== null;
    }
}