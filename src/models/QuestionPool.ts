import type { QuizQuestion } from './QuizQuestion.ts';

export interface QuestionPool {
    questionFile: string;
    questions: readonly QuizQuestion[];
}