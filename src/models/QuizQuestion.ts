import type { QuizAnswer } from "./QuizAnswer.ts";

export interface QuizQuestion {
    id: string;
    question: string;
    answers: readonly QuizAnswer[];
    explanation: string;
}