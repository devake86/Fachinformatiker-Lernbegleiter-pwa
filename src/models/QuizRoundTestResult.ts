import type { QuizQuestion } from './QuizQuestion.ts';

export interface QuizRoundTestResult {
    loadedQuestionCount: number;
    roundQuestions: readonly QuizQuestion[];
    originalPoolSizes: readonly number[];
    remainingPoolSizes: readonly number[];
}