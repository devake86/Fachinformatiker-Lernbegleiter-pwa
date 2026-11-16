import { describe, expect, test } from 'vitest';
import type { QuestionPool } from '../models/QuestionPool.ts';
import type { QuizQuestion } from '../models/QuizQuestion.ts';
import { QuizRoundFactory } from './QuizRoundFactory.ts';

function createQuestion(id: string): QuizQuestion {
    return {
        id,
        question: `Testfrage ${id}`,
        answers: [
            { text: 'Richtige Antwort', correct: true },
            { text: 'Falsche Antwort', correct: false },
        ],
        explanation: `Erklärung zu ${id}`
    };
}

function createQuestionPool(prefix: string, questionCount: number): QuestionPool {
    return {
        questionFile: `${prefix}.json`,
        questions: Array.from({ length: questionCount }, (_, index) => createQuestion(`${prefix}-${index + 1}`))
    };
}

describe('QuizRoundFactory', () => {
    const quizRoundFactory = new QuizRoundFactory();

    test('begrenzt eine Quizrunde auf 20 Fragen', () => {
        const questionPools = [
            createQuestionPool('python', 40),
            createQuestionPool('sql', 40),
        ];
        const roundQuestions = quizRoundFactory.createRound(questionPools);

        expect(roundQuestions).toHaveLength(20);
    });

    test('erzeugt keine doppelten Fragen-IDs', () => {
        const questionPools = [
            createQuestionPool('python', 40),
            createQuestionPool('sql', 40),
        ];
        const roundQuestions = quizRoundFactory.createRound(questionPools);
        const questionIds = roundQuestions.map((question) => question.id);
        const uniqueQuestionIds = new Set(questionIds);

        expect(uniqueQuestionIds.size).toBe(questionIds.length);
    });

    test('berücksichtigt gleich große Pools gleichmäßig', () => {
        const questionPools = [
            createQuestionPool('python', 40),
            createQuestionPool('sql', 40),
        ];
        const roundQuestions = quizRoundFactory.createRound(questionPools);
        const pythonQuestionCount = roundQuestions.filter((question) => question.id.startsWith('python-')).length;
        const sqlQuestionCount = roundQuestions.filter((question) => question.id.startsWith('sql-')).length;

        expect(pythonQuestionCount).toBe(10);
        expect(sqlQuestionCount).toBe(10);
    });

    test('erzeugt auch aus weniger als 20 Fragen eine Runde', () => {
        const questionPools = [
            createQuestionPool('python', 3),
            createQuestionPool('sql', 3),
        ];
        const roundQuestions = quizRoundFactory.createRound(questionPools);

        expect(roundQuestions).toHaveLength(6);
    });

    test('verändert die ursprünglichen Fragenpools nicht', () => {
        const questionPools = [
            createQuestionPool('python', 40),
            createQuestionPool('sql', 40),
        ];
        const originalPoolSizes = questionPools.map((questionPool) => questionPool.questions.length);

        quizRoundFactory.createRound(questionPools);

        const currentPoolSizes = questionPools.map((questionPool) => questionPool.questions.length);

        expect(currentPoolSizes).toEqual(originalPoolSizes);
    });

    test('lehnt eine ungültige maximale Fragenanzahl ab', () => {
        const questionPools = [
            createQuestionPool('test', 10),
        ];

        expect(() => quizRoundFactory.createRound(questionPools, 0)).toThrow('Die maximale Fragenanzahl muss eine positive Ganzzahl sein.');
    });
});