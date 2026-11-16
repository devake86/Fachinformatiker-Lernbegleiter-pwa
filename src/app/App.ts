import { MainMenuView } from '../views/MainMenuView.ts';
import { LearningFieldView } from '../views/LearningFieldView.ts';
import { QuestionCategoryView } from '../views/QuestionCategoryView.ts';
import { SelectionSummaryView } from '../views/SelectionSummaryView.ts';
import type { QuestionSet } from '../models/QuestionSet.ts';
import { LEARNING_FIELDS } from '../data/LearningFieldCatalog.ts';
import type { LearningField } from '../models/LearningField.ts';
import { ThemeService } from '../services/ThemeService.ts';
import { QuestionLoader } from '../services/QuestionLoader.ts';
import { QuizRoundFactory } from '../services/QuizRoundFactory.ts';
import type { QuizRoundTestResult } from '../models/QuizRoundTestResult.ts';

export class App {
    private readonly appContainer: HTMLDivElement;
    private readonly themeService: ThemeService;
    private readonly questionLoader: QuestionLoader;
    private readonly quizRoundFactory: QuizRoundFactory;

    public constructor() {
        const appElement = document.querySelector<HTMLDivElement>('#app');

        if (appElement === null) {
            throw new Error('Das App Element wurde nicht gefunden');
        }

        this.appContainer = appElement;
        this.themeService = new ThemeService();
        this.questionLoader = new QuestionLoader();
        this.quizRoundFactory = new QuizRoundFactory();
    }

    public start(): void {
        const currentTheme = this.themeService.getCurrentTheme();

        this.themeService.applyTheme(currentTheme);
        this.showMainMenu();
    }

    private showMainMenu(): void {
        const mainMenuView = new MainMenuView(
            this.themeService.getCurrentTheme(),
            (selectedTheme) => this.themeService.applyTheme(selectedTheme), // Wendet das vom Hauptmenü ausgewählte Theme an
            () => this.showLearningFieldSelection() // Öffnet die Lernfeldauswahl
        );

        this.appContainer.replaceChildren(mainMenuView.createElement()); // Ersetzt den bisherigen Inhalt des App-Containers durch das Hauptmenü
    }

    private showLearningFieldSelection(): void {
        const learningFieldView = new LearningFieldView(
            LEARNING_FIELDS,
            (selectedLearningField) => this.showQuestionCategorySelection(selectedLearningField), // Öffnet die Kategorien des ausgewählten Lernfelds
            () => this.showMainMenu() // Kehrt zum Hauptmenü zurück
        );

        this.appContainer.replaceChildren(learningFieldView.createElement());
    }

    private showQuestionCategorySelection(learningField: LearningField): void {
        const questionCategoryView = new QuestionCategoryView(
            learningField,
            (selectedQuestionSet) => this.showSelectedSummary(learningField, selectedQuestionSet),
            () => this.showLearningFieldSelection()
        );

        this.appContainer.replaceChildren(questionCategoryView.createElement());
    }

    private showSelectedSummary(learningField: LearningField, questionSet: QuestionSet): void {
        const selectionSummaryView = new SelectionSummaryView(
            learningField,
            questionSet,
            async (): Promise<QuizRoundTestResult> => {
                const questionPools = await this.questionLoader.loadQuestionPools(questionSet.questionFiles);
                const loadedQuestionCount = questionPools.reduce((totalQuestionCount, questionPool) => totalQuestionCount + questionPool.questions.length, 0); // Gesamtsumme der Pools ermitteln
                const originalPoolSizes = questionPools.map((questionPool) => questionPool.questions.length);
                const roundQuestions = this.quizRoundFactory.createRound(questionPools);
                const remainingPoolSizes = questionPools.map((questionPool) => questionPool.questions.length);

                return {loadedQuestionCount, roundQuestions, originalPoolSizes, remainingPoolSizes};
            },
            () => this.showQuestionCategorySelection(learningField),
        );

        this.appContainer.replaceChildren(selectionSummaryView.createElement());
    }
}
