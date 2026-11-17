import { APP_VERSION } from '../config/AppConfig.ts';
import type { QuizAnswer } from '../models/QuizAnswer.ts';
import { QuizEngine } from '../services/QuizEngine.ts';
import { shuffledCopy } from '../utils/ArrayUtils.ts';

export class QuizView {
    private readonly quizEngine: QuizEngine;
    private readonly learningFieldLabel: string;
    private readonly questionCategoryLabel: string;
    private readonly onExitRequested: () => void;
    private readonly onQuizFinished: (score: number, questionCount: number) => void;

    private quizElement: HTMLElement | null = null;

    private selectedAnswerIndex: number | null = null;
    private answerWasEvaluated = false;
    private currentAnswers: readonly QuizAnswer[] = [];

    public constructor(
        quizEngine: QuizEngine,
        learningFieldLabel: string,
        questionCategoryLabel: string,
        onExitRequested: () => void,
        onQuizFinished: (score: number, questionCount: number) => void
    ) {
        this.quizEngine = quizEngine;
        this.learningFieldLabel = learningFieldLabel;
        this.questionCategoryLabel = questionCategoryLabel;
        this.onExitRequested = onExitRequested;
        this.onQuizFinished = onQuizFinished;
    }

    public createElement(): HTMLElement {
        const quizElement = document.createElement('main');

        quizElement.className = 'content-view quiz-view';

        this.quizElement = quizElement;

        this.renderCurrentQuestion();

        return quizElement;
    }

    private renderCurrentQuestion(): void {
        if (this.quizElement === null) {
            throw new Error('Die Quizansicht wurde noch nicht erstellt.');
        }

        this.selectedAnswerIndex = null;
        this.answerWasEvaluated = false;

        const currentQuestion = this.quizEngine.getCurrentQuestion();
        this.currentAnswers = shuffledCopy(currentQuestion.answers);

        this.quizElement.innerHTML = `
                <header class="quiz-header">
                    <span>${this.learningFieldLabel} - ${this.questionCategoryLabel}</span>
        
                    <span class="version-label">${APP_VERSION}</span>
                </header>
        
                <section class="quiz-progress">
                    <span>Frage ${this.quizEngine.getCurrentQuestionNumber()} / ${this.quizEngine.getQuestionCount()}</span>
        
                    <code class="question-id">ID: ${currentQuestion.id}</code>
                </section>
        
                <section class="quiz-question">
                    <h1>${currentQuestion.question}</h1>
        
                    <p class="question-explanation" data-question-explanation hidden>
                        <span class="question-explanation-text">${currentQuestion.explanation}</span>
                    </p>
                </section>
        
                <div class="answer-list" role="group" aria-label="Antwortmöglichkeiten">
                    ${this.createAnswerButtons(this.currentAnswers)}
                </div>
        
                <footer class="quiz-controls">
                    <button class="navigation-button confirm-answer-button" type="button" data-action="confirm-answer" disabled>
                        Bestätigen
                    </button>
        
                    <button class="quiz-exit-button" type="button" data-action="exit-quiz" aria-label="Quiz verlassen">
                        ×
                    </button>
                </footer>
            `;

        this.initializeAnswerSelection(this.quizElement);
        this.initializeConfirmButton(this.quizElement);
        this.initializeExitButton(this.quizElement);
    }

    private createAnswerButtons(answers: readonly QuizAnswer[]): string {
        return answers.map((answer, answerIndex) => `
                <button class="answer-button" type="button" data-answer-index="${answerIndex}" aria-pressed="false">
                    <span class="answer-button-text">${answer.text}</span>
                </button>
            `).join('');
    }

    private initializeAnswerSelection(quizElement: HTMLElement): void {
        const answerButtons = quizElement.querySelectorAll<HTMLButtonElement>('[data-answer-index]');
        const confirmAnswerButton = quizElement.querySelector<HTMLButtonElement>('[data-action="confirm-answer"]');

        if (confirmAnswerButton === null) {
            throw new Error('Der Bestätigen-Button wurde nicht gefunden.');
        }

        answerButtons.forEach((answerButton) => {
            answerButton.addEventListener('click', () => {
                if (this.answerWasEvaluated) {
                    return;
                }

                const answerIndexValue = answerButton.dataset.answerIndex;

                if (answerIndexValue === undefined) {
                    throw new Error('Der Antwortindex wurde nicht gefunden.');
                }

                const answerIndex = Number(answerIndexValue);

                if (!Number.isInteger(answerIndex)) {
                    throw new Error('Der Antwortindex ist ungültig.');
                }

                this.selectedAnswerIndex = answerIndex;

                this.updateSelectedAnswerButton(answerButtons, answerIndex);

                confirmAnswerButton.disabled = false;
            });
        });
    }

    private updateSelectedAnswerButton(answerButtons: NodeListOf<HTMLButtonElement>, selectedAnswerIndex: number): void {
        answerButtons.forEach((answerButton) => {
            const answerIndex = Number(answerButton.dataset.answerIndex);
            const isSelected = answerIndex === selectedAnswerIndex;

            answerButton.classList.toggle('selected', isSelected);
            answerButton.setAttribute('aria-pressed', String(isSelected));
        });
    }

    private initializeConfirmButton(quizElement: HTMLElement): void {
        const confirmAnswerButton = quizElement.querySelector<HTMLButtonElement>('[data-action="confirm-answer"]');

        if (confirmAnswerButton === null) {
            throw new Error('Der Bestätigen-Button wurde nicht gefunden.');
        }

        confirmAnswerButton.addEventListener('click', () => {
            if (this.answerWasEvaluated) {
                this.continueAfterEvaluation();
                return;
            }

            if (this.selectedAnswerIndex === null) {
                return;
            }

            this.evaluateSelectedAnswer(quizElement, confirmAnswerButton);
        });
    }

    private evaluateSelectedAnswer(quizElement: HTMLElement, confirmAnswerButton: HTMLButtonElement): void {
        if (this.selectedAnswerIndex === null) {
            return;
        }

        const selectedAnswer = this.currentAnswers[this.selectedAnswerIndex];

        if (selectedAnswer === undefined) {
            throw new Error('Die ausgewählte Antwort wurde nicht gefunden.');
        }

        const selectedAnswerIsCorrect = selectedAnswer.correct;

        if (selectedAnswerIsCorrect) {
            this.quizEngine.increaseScore();
        }

        this.answerWasEvaluated = true;

        const answerButtons = quizElement.querySelectorAll<HTMLButtonElement>('[data-answer-index]');

        answerButtons.forEach((answerButton) => {
            const answerIndex = Number(answerButton.dataset.answerIndex);
            const answer = this.currentAnswers[answerIndex];

            if (answer === undefined) {
                throw new Error('Die Antwort zur Auswertung wurde nicht gefunden.');
            }

            if (answer.correct) {
                answerButton.classList.add('correct');
            } else if (answerIndex === this.selectedAnswerIndex) {
                answerButton.classList.add('wrong');
            }

            answerButton.disabled = true;
        });

        const explanationElement = quizElement.querySelector<HTMLParagraphElement>('[data-question-explanation]');

        if (explanationElement === null) {
            throw new Error('Das Element für die Erklärung wurde nicht gefunden.');
        }

        explanationElement.hidden = false;

        confirmAnswerButton.textContent = this.quizEngine.isLastQuestion() ? 'Ergebnis anzeigen' : 'Nächste Frage';
        confirmAnswerButton.disabled = false;
    }

    private continueAfterEvaluation(): void {
        if (this.quizEngine.isLastQuestion()) {
            this.onQuizFinished(this.quizEngine.getScore(), this.quizEngine.getQuestionCount());

            return;
        }

        this.quizEngine.moveToNextQuestion();
        this.renderCurrentQuestion();
    }

    private initializeExitButton(quizElement: HTMLElement): void {
        const exitButton = quizElement.querySelector<HTMLButtonElement>('[data-action="exit-quiz"]');

        if (exitButton === null) {
            throw new Error('Der Button zum Verlassen des Quiz wurde nicht gefunden.');
        }

        exitButton.addEventListener('click', () => this.onExitRequested());
    }
}