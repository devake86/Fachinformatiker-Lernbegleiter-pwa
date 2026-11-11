import type { LearningField } from "../models/LearningField.ts";
import type { QuestionCategory } from "../models/QuestionCategory.ts";

export class QuestionCategoryView {
    private readonly learningField: LearningField;
    private readonly onQuestionCategorySelected: (questionCategory: QuestionCategory) => void;
    private readonly onBackRequested: () => void;

    public constructor(
        learningField: LearningField,
        onQuestionCategorySelected: (questionCategory: QuestionCategory) => void,
        onBackRequested: () => void
        ) {
            this.learningField = learningField;
            this.onQuestionCategorySelected = onQuestionCategorySelected;
            this.onBackRequested = onBackRequested;
    }

    public createElement(): HTMLElement {
        const questionCategoryElement = document.createElement('main');

        questionCategoryElement.className = 'content-view question-category-view';

        questionCategoryElement.innerHTML = `
            <header class="app-header">
                <span class="version-label">v0.2.0-dev</span>
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
        return this.learningField.categories.map((questionCategory) => `
            <button class="selection-button" type="button" data-question-category-id="${questionCategory.id}">
                ${questionCategory.label}
            </button>
        `).join('');
    }

    private initializeQuestionCategoryButtons(questionCategoryElement: HTMLElement): void {
        const questionCategoryButtons = questionCategoryElement.querySelectorAll<HTMLButtonElement>('[data-question-category-id]');

        questionCategoryButtons.forEach((questionCategoryButton) => {
            questionCategoryButton.addEventListener('click', () => {
                const selectedQuestionCategory = this.findQuestionCategory(questionCategoryButton.dataset.questionCategoryId);

                this.onQuestionCategorySelected(selectedQuestionCategory);
            });
        });
    }

    private findQuestionCategory(questionCategoryId: string | undefined): QuestionCategory {
        const questionCategory = this.learningField.categories.find((category) => category.id === questionCategoryId);

        if (questionCategory === undefined) {
            throw new Error('Die ausgewählte Fragenkategorie wurde nicht gefunden.')
        }

        return questionCategory;
    }

    private initializeNavigation(questionCategoryElement: HTMLElement) {
        const backButton = questionCategoryElement.querySelector<HTMLButtonElement>('[data-action="back"]');

        if (backButton === null) {
            throw new Error('Der Zurück-Button wurde nicht gefunden.')
        }

        backButton.addEventListener('click', () => this.onBackRequested());
    }
}
