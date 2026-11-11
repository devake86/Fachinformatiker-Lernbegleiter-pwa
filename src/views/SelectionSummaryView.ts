import type { LearningField } from "../models/LearningField.ts";
import type { QuestionCategory } from "../models/QuestionCategory.ts";

export class SelectionSummaryView {
    private readonly learningField: LearningField;
    private readonly questionCategory: QuestionCategory;
    private readonly onBackRequested: () => void;

    public constructor(
        learningField: LearningField,
        questionCategory: QuestionCategory,
        onBackRequested: () => void
        ) {
            this.learningField = learningField;
            this.questionCategory = questionCategory;
            this.onBackRequested = onBackRequested;
    }

    public createElement(): HTMLElement {
        const selectionSummaryElement = document.createElement('main');

        selectionSummaryElement.className = 'content-view selection-summary-view';

        selectionSummaryElement.innerHTML = `
            <header class="app-header">
                <span class="version-label">v0.2.0-dev</span>
            </header>
        
            <section class="content-header">
                <h1>Auswahl übernommen</h1>
                
                <p>
                    ${this.learningField.label}<br>
                    ${this.questionCategory.label}
                </p>
            </section>
        
            <div class="selection-actions" aria-hidden="true"></div>
        
            <footer class="navigation-section">
                <button class="navigation-button" type="button" data-action="back">
                    Zurück
                </button>
            </footer>        
        `;

        this.initializeNavigation(selectionSummaryElement);

        return selectionSummaryElement;
    }

    private initializeNavigation(selectionSummaryElement: HTMLElement): void {
        const backButton = selectionSummaryElement.querySelector<HTMLButtonElement>('[data-action="back"]');

        if (backButton === null) {
            throw new Error('Der Zurück-Button wurde nicht gefunden.');
        }

        backButton.addEventListener('click', () => this.onBackRequested());
    }
}
