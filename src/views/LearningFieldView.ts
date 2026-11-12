import type { LearningField } from "../models/LearningField.ts";

export class LearningFieldView {
    private readonly learningFields: readonly LearningField[];
    private readonly onLearningFieldSelected: (learningField: LearningField) => void;
    private readonly onBackRequested: () => void;

    public constructor(
        learningFields: readonly LearningField[],
        onLearningFieldSelected: (learningField: LearningField) => void,
        onBackRequested: () => void
        ) {
            this.learningFields = learningFields;
            this.onLearningFieldSelected = onLearningFieldSelected;
            this.onBackRequested = onBackRequested;
    }

    public createElement(): HTMLElement {
        const learningFieldElement = document.createElement('main');

        learningFieldElement.className = "content-view learning-field-view";

        learningFieldElement.innerHTML = `
            <header class="app-header">
                <span class="version-label">v0.3.0-dev</span>
            </header>
        
            <section class="content-header">
                <h1>Lernfeld auswählen</h1>
                
                <p>
                    Wähle ein Lernfeld aus, das du vertiefen möchtest.
                </p>
            </section>
            
            <nav class="selection-actions" aria-label="Lernfeldauswahl">
                ${this.createLearningFieldButtons()}
            </nav>
            
            <footer class="navigation-section">
                <button class="navigation-button" type="button" data-action="back">
                    Zurück
                </button>
            </footer>
        `;

        this.initializeLearningFieldButtons(learningFieldElement);
        this.initializeNavigation(learningFieldElement);

        return learningFieldElement;
    }

    private createLearningFieldButtons(): string {
        return this.learningFields.map((learningField) => `
            <button class="selection-button" type="button" data-learning-field-id="${learningField.id}">
                ${learningField.label}
            </button>
        `).join('');
    }

    private initializeLearningFieldButtons(learningFieldElement: HTMLElement): void {
        const learningFieldButtons = learningFieldElement.querySelectorAll<HTMLButtonElement>('[data-learning-field-id]');

        learningFieldButtons.forEach((learningFieldButton) => {
            learningFieldButton.addEventListener('click', () => {
                const selectedLearningField = this.findLearningField(learningFieldButton.dataset.learningFieldId);

                this.onLearningFieldSelected(selectedLearningField);
            });
        });
    }

    private findLearningField(learningFieldId: string | undefined): LearningField {
        const learningField = this.learningFields.find((field) => field.id === learningFieldId);

        if (learningField === undefined) {
            throw new Error('Das ausgewählte Lernfeld wurde nicht gefunden.')
        }

        return learningField;
    }

    private initializeNavigation(learningFieldElement: HTMLElement) {
        const backButton = learningFieldElement.querySelector<HTMLButtonElement>('[data-action="back"]');

        if (backButton === null) {
            throw new Error('Der Zurück-Button wurde nicht gefunden.');
        }

        backButton.addEventListener('click', () => this.onBackRequested())
    }
}
