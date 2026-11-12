import type { LearningField } from "../models/LearningField.ts";
import type { QuestionSet } from "../models/QuestionSet.ts";

export class QuestionCategoryView {
    private readonly learningField: LearningField;
    private readonly onQuestionSetSelected: (questionSet: QuestionSet) => void;
    private readonly onBackRequested: () => void;

    public constructor(
        learningField: LearningField,
        onQuestionSetSelected: (questionSet: QuestionSet) => void,
        onBackRequested: () => void
        ) {
            this.learningField = learningField;
            this.onQuestionSetSelected = onQuestionSetSelected;
            this.onBackRequested = onBackRequested;
    }

    public createElement(): HTMLElement {
        const questionCategoryElement = document.createElement('main');

        questionCategoryElement.className = 'content-view question-category-view';

        questionCategoryElement.innerHTML = `
            <header class="app-header">
                <span class="version-label">v0.3.0-dev</span>
            </header>
        
            <section class="content-header">
                <h1>${this.learningField.label}</h1>
                
                <p>
                    Wähle die gewünschte Fragenkategorie aus.
                </p>
            </section>
        
            <nav class="selection-actions" aria-label="Fragenkategorieauswahl">
                ${this.createQuestionCategoryButtons()}
            </nav>
        
            <footer class="navigation-section">
                <button class="navigation-button" type="button" data-action="back">
                    Zurück
                </button>
            </footer>        
        `;

        this.initializeQuestionCategoryButtons(questionCategoryElement);

        this.initializeNavigation(questionCategoryElement);

        return questionCategoryElement;
    }

    private createQuestionCategoryButtons(): string {
        return this.learningField.questionSets.map((questionSet) => `
            <button class="selection-button" type="button" data-question-category-id="${questionSet.category.id}">
                ${questionSet.category.label}
            </button>
        `).join('');
    }

    private initializeQuestionCategoryButtons(questionCategoryElement: HTMLElement): void {
        const questionCategoryButtons = questionCategoryElement.querySelectorAll<HTMLButtonElement>('[data-question-category-id]');

        questionCategoryButtons.forEach((questionCategoryButton) => {
            questionCategoryButton.addEventListener('click', () => {
                const selectedQuestionSet = this.findQuestionSet(questionCategoryButton.dataset.questionCategoryId);

                this.onQuestionSetSelected(selectedQuestionSet);
            });
        });
    }

    private findQuestionSet(questionCategoryId: string | undefined): QuestionSet {
        const questionSet = this.learningField.questionSets.find((set) => set.category.id === questionCategoryId);

        if (questionSet === undefined) {
            throw new Error('Der ausgewählte Fragenbestand wurde nicht gefunden.')
        }

        return questionSet;
    }

    private initializeNavigation(questionCategoryElement: HTMLElement) {
        const backButton = questionCategoryElement.querySelector<HTMLButtonElement>('[data-action="back"]');

        if (backButton === null) {
            throw new Error('Der Zurück-Button wurde nicht gefunden.')
        }

        backButton.addEventListener('click', () => this.onBackRequested());
    }
}
