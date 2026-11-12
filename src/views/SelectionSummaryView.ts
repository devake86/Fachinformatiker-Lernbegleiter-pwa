import type { LearningField } from "../models/LearningField.ts";
import type { QuestionSet } from "../models/QuestionSet.ts";

export class SelectionSummaryView {
    private readonly learningField: LearningField;
    private readonly questionSet: QuestionSet;
    private readonly onBackRequested: () => void;

    public constructor(
        learningField: LearningField,
        questionSet: QuestionSet,
        onBackRequested: () => void
        ) {
            this.learningField = learningField;
            this.questionSet = questionSet;
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
                    ${this.learningField.label} - ${this.questionSet.category.label}<br><br>
                    ${this.questionSet.questionFiles.length} zugeordnete Fragendatei(en):<br>  
                    ${this.createQuestionFileList()}                  
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

    private createQuestionFileList(): string {
        return this.questionSet.questionFiles.map((questionFile) => `
            <code>${questionFile}</code><br>
        `).join('');
    }

    private initializeNavigation(selectionSummaryElement: HTMLElement): void {
        const backButton = selectionSummaryElement.querySelector<HTMLButtonElement>('[data-action="back"]');

        if (backButton === null) {
            throw new Error('Der Zurück-Button wurde nicht gefunden.');
        }

        backButton.addEventListener('click', () => this.onBackRequested());
    }
}
