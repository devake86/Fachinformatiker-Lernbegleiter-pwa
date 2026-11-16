import type { LearningField } from '../models/LearningField.ts';
import type { QuestionSet } from '../models/QuestionSet.ts';
import { APP_VERSION } from '../config/AppConfig.ts';
import type { QuizRoundTestResult } from '../models/QuizRoundTestResult.ts';

export class SelectionSummaryView {
    private readonly learningField: LearningField;
    private readonly questionSet: QuestionSet;
    private readonly onLoadRequested: () => Promise<QuizRoundTestResult>;
    private readonly onBackRequested: () => void;

    public constructor(
        learningField: LearningField,
        questionSet: QuestionSet,
        onLoadRequested: () => Promise<QuizRoundTestResult>,
        onBackRequested: () => void
        ) {
            this.learningField = learningField;
            this.questionSet = questionSet;
            this.onLoadRequested = onLoadRequested;
            this.onBackRequested = onBackRequested;
    }

    public createElement(): HTMLElement {
        const selectionSummaryElement = document.createElement('main');

        selectionSummaryElement.className = 'content-view selection-summary-view';

        selectionSummaryElement.innerHTML = `
            <header class="app-header">
                <span class="version-label">${APP_VERSION}</span>
            </header>
        
            <section class="content-header">
                <h1>Auswahl übernommen</h1>
                
                <p>
                    ${this.learningField.label} - ${this.questionSet.category.label}<br><br>
                    ${this.questionSet.questionFiles.length} zugeordnete Fragendatei(en):<br>  
                    ${this.createQuestionFileList()}                  
                </p>       
            </section>         
            
            <div class="selection-actions">
                <button class="selection-button" type="button" data-action="load-questions">
                    Quizrunde erzeugen
                </button>
                
                <p class="load-result" data-load-result aria-live="polite"></p>
                
                <div class="round-test-result" data-round-test-result aria-live="polite"></div>
            </div>
        
            <footer class="navigation-section">
                <button class="navigation-button" type="button" data-action="back">
                    Zurück
                </button>
            </footer>        
        `;

        this.initializeQuestionLoading(selectionSummaryElement);

        this.initializeNavigation(selectionSummaryElement);

        return selectionSummaryElement;
    }

    private createQuestionFileList(): string {
        return this.questionSet.questionFiles.map((questionFile) => `
            <code>${questionFile}</code><br>
        `).join('');
    }

    private initializeQuestionLoading(selectionSummaryElement: HTMLElement): void {
        const loadButton = selectionSummaryElement.querySelector<HTMLButtonElement>('[data-action="load-questions"]');
        const loadResult = selectionSummaryElement.querySelector<HTMLParagraphElement>('[data-load-result]');
        const roundTestResult = selectionSummaryElement.querySelector<HTMLDivElement>('[data-round-test-result]');

        if (loadButton === null || loadResult === null || roundTestResult === null) {
            throw new Error('Die Bedienelemente zum Laden der Fragen wurden nicht gefunden.')
        }

        loadButton.addEventListener('click', async () => {
            loadButton.disabled = true;
            loadResult.textContent = 'Fragen werden geladen...';

            try {
                const testResult = await this.onLoadRequested();
                const questionIds = testResult.roundQuestions.map((question) => question.id);
                const uniqueQuestionIdCount = new Set(questionIds).size;
                const containsDuplicateQuestionIds = uniqueQuestionIdCount !== questionIds.length;
                const originalPoolSizes = testResult.originalPoolSizes.join(', ');
                const remainingPoolSizes = testResult.remainingPoolSizes.join(', ');

                loadResult.textContent = `${testResult.loadedQuestionCount} Fragen geladen, ${testResult.roundQuestions.length} Fragen ausgewählt.`;

                roundTestResult.innerHTML = `
                    <p>
                        Doppelte Fragen-IDs:
                        <strong>
                            ${containsDuplicateQuestionIds ? 'Ja' : 'Nein'}
                        </strong>
                    </p>
                    
                    <p>
                        Poolgrößen vor Rundenerzeugung:
                        <code>${originalPoolSizes}</code>
                    </p>
                    
                    <p>
                        Poolgrößen nach Rundenerzeugung:
                        <code>${remainingPoolSizes}</code>
                    </p>
                    
                    <p>Ausgewählte Fragen-IDs:</p>
                
                    <code>${questionIds.join('<br>')}</code>
                `;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Beim Erzeugen der Quizrunde ist ein unbekannter Fehler aufgetreten.';

                loadResult.textContent = errorMessage;
                roundTestResult.replaceChildren();
            } finally {
                loadButton.disabled = false;
            }
        });
    }

    private initializeNavigation(selectionSummaryElement: HTMLElement): void {
        const backButton = selectionSummaryElement.querySelector<HTMLButtonElement>('[data-action="back"]');

        if (backButton === null) {
            throw new Error('Der Zurück-Button wurde nicht gefunden.');
        }

        backButton.addEventListener('click', () => this.onBackRequested());
    }
}
