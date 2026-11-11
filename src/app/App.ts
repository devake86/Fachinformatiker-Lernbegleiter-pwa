import { MainMenuView } from '../views/MainMenuView.ts';
import { LearningFieldView } from '../views/LearningFieldView.ts';
import { QuestionCategoryView } from "../views/QuestionCategoryView.ts";
import { SelectionSummaryView } from "../views/SelectionSummaryView.ts";
import type { QuestionCategory } from "../models/QuestionCategory.ts";
import { LEARNING_FIELDS } from "../data/LearningFieldCatalog.ts";
import type { LearningField } from "../models/LearningField.ts";
import { ThemeService } from '../services/ThemeService.ts';

export class App {
    private readonly appContainer: HTMLDivElement;
    private readonly themeService: ThemeService;

    public constructor() {
        const appElement = document.querySelector<HTMLDivElement>('#app');

        if (appElement === null) {
            throw new Error('Das App Element wurde nicht gefunden');
        }

        this.appContainer = appElement;
        this.themeService = new ThemeService();
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
            (selectedQuestionCategory) => this.showSelectedSummary(learningField, selectedQuestionCategory),
            () => this.showLearningFieldSelection()
        );

        this.appContainer.replaceChildren(questionCategoryView.createElement());
    }

    private showSelectedSummary(learningField: LearningField, questionCategory: QuestionCategory): void {
        const selectionSummaryView = new SelectionSummaryView(
            learningField,
            questionCategory,
            () => this.showQuestionCategorySelection(learningField),
        );

        this.appContainer.replaceChildren(selectionSummaryView.createElement());
    }
}
