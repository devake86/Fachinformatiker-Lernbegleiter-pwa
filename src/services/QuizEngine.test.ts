import { describe, expect, test } from 'vitest';
import type { QuizQuestion } from '../models/QuizQuestion.ts';
import { QuizEngine } from './QuizEngine.ts';

function createQuestion(id: string): QuizQuestion {
    return {
        id,
        question: `Testfrage ${id}`,
        answers: [
            { text: 'Richtige Antwort', correct: true },
            { text: 'Falsche Antwort', correct: false }
        ],
        explanation: `Erklärung zu ${id}`
    };
}

describe('QuizEngine', () => {
    test('startet mit der ersten Frage und null Punkten', () => {
        const questions = [
            createQuestion('frage-1'),
            createQuestion('frage-2')
        ];
        const quizEngine = new QuizEngine(questions);

        expect(quizEngine.getCurrentQuestion().id).toBe('frage-1');
        expect(quizEngine.getCurrentQuestionNumber()).toBe(1);
        expect(quizEngine.getQuestionCount()).toBe(2);
        expect(quizEngine.getScore()).toBe(0);
    });

    test('prüft richtige und falsche Antworten', () => {
        const quizEngine = new QuizEngine([createQuestion('frage-1')]);

        expect(quizEngine.checkAnswer(0)).toBe(true);
        expect(quizEngine.checkAnswer(1)).toBe(false);
    });

    test('erhöht den Punktestand', () => {
        const quizEngine = new QuizEngine([createQuestion('frage-1')]);

        quizEngine.increaseScore();

        expect(quizEngine.getScore()).toBe(1);
    });

    test('wechselt zur nächsten Frage', () => {
        const quizEngine = new QuizEngine([
            createQuestion('frage-1'),
            createQuestion('frage-2')
        ]);

        quizEngine.moveToNextQuestion();

        expect(quizEngine.getCurrentQuestion().id).toBe('frage-2');
        expect(quizEngine.getCurrentQuestionNumber()).toBe(2);
        expect(quizEngine.isLastQuestion()).toBe(true);
    });

    test('lehnt einen ungültigen Antwortindex ab', () => {
        const quizEngine = new QuizEngine([createQuestion('frage-1')]);

        expect(() => quizEngine.checkAnswer(99)).toThrow('Die ausgewählte Antwort wurde nicht gefunden.');
    });

    test('erlaubt keinen Wechsel nach der letzten Frage', () => {
        const quizEngine = new QuizEngine([createQuestion('frage-1')]);

        expect(() => quizEngine.moveToNextQuestion()).toThrow('Nach der letzten Frage kann nicht weitergesprungen werden.');
    });

    test('lehnt eine leere Quizrunde ab', () => {
        expect(() => new QuizEngine([])).toThrow('Eine Quizrunde benötigt mindestens eine Frage.');
    });
});
