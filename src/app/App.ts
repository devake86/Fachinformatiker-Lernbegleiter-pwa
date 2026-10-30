import { MainMenuView } from '../views/MainMenuView.ts';
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

        const mainMenuView = new MainMenuView(
            currentTheme,
            (selectedTheme) => this.themeService.applyTheme(selectedTheme) // Callback-Funktion, die bei einer Theme-Auswahl ausgeführt wird
        );

        this.appContainer.replaceChildren(mainMenuView.createElement()); // Ersetzt den bisherigen Inhalt des App-Containers durch das Hauptmenü
    }
}
