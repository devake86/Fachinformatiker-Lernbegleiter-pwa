import type { QuizQuestion } from "../models/QuizQuestion.ts";

export class QuizEngine {
    private readonly questions: readonly QuizQuestion[];

    private currentQuestionIndex = 0;
    private score = 0;

    public constructor(questions: readonly QuizQuestion[]) {
        if (questions.length === 0) {
            throw new Error ('Eine Quizrunde benötigt mindestens eine Frage.');
        }

        this.questions = questions;
    }

    public getQuestions(): readonly QuizQuestion[] {
        return this.questions;
    }

    public getCurrentQuestion(): QuizQuestion {
        return this.questions[this.currentQuestionIndex];
    }

    public getCurrentQuestionNumber(): number {
        return this.currentQuestionIndex + 1;
    }

    public getQuestionCount(): number {
        return this.questions.length;
    }

    public getScore(): number {
        return this.score;
    }

    public isLastQuestion(): boolean {
        return this.currentQuestionIndex === this.questions.length - 1;
    }

    public checkAnswer(answerIndex: number): boolean {
        const currentQuestion = this.getCurrentQuestion();
        const selectedAnswer = currentQuestion.answers[answerIndex];

        if (selectedAnswer === undefined) {
            throw new Error('Die ausgewählte Antwort wurde nicht gefunden.')
        }

        return selectedAnswer.correct;
    }

    public increaseScore(): void {
        this.score++;
    }

    public moveToNextQuestion(): void {
        if (this.isLastQuestion()) {
            throw new Error('Nach der letzten Frage kann nicht weitergesprungen werden.')
        }

        this.currentQuestionIndex++;
    }
}