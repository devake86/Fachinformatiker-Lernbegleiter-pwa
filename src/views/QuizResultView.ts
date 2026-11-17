import { APP_VERSION } from '../config/AppConfig.ts';

export class QuizResultView {
    private readonly score: number;
    private readonly questionCount: number;
    private readonly onFinishRequested: () => void;

    public constructor(
        score: number,
        questionCount: number,
        onFinishRequested: () => void
    ) {
        this.score = score;
        this.questionCount = questionCount;
        this.onFinishRequested = onFinishRequested;
    }

    public createElement(): HTMLElement {
        const quizResultElement = document.createElement('main');

        quizResultElement.className = 'content-view quiz-result-view';

        quizResultElement.innerHTML = `
            <header class="app-header">
                <span class="version-label">${APP_VERSION}</span>
            </header>

            <section class="quiz-result-content">
                <h1>Quizrunde abgeschlossen</h1>

                <p class="quiz-result-score">${this.score} / ${this.questionCount}</p>

                <p>Fragen richtig beantwortet</p>
            </section>

            <footer class="navigation-section">
                <button class="navigation-button" type="button" data-action="finish-quiz">
                    Zur Auswahl
                </button>
            </footer>
        `;

        this.initializeFinishButton(quizResultElement);

        return quizResultElement;
    }

    private initializeFinishButton(quizResultElement: HTMLElement): void {
        const finishButton = quizResultElement.querySelector<HTMLButtonElement>('[data-action="finish-quiz"]');

        if (finishButton === null) {
            throw new Error('Der Button zum Beenden der Quizrunde wurde nicht gefunden.');
        }

        finishButton.addEventListener('click', () => this.onFinishRequested());
    }
}