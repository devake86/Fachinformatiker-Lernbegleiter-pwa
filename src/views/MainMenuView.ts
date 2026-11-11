import type { Theme } from '../services/ThemeService.ts'; // Importiert nur den Typ Theme, nicht den zur Laufzeit verwendeten ThemeService

export class MainMenuView {

    private readonly initialTheme: Theme;
    private readonly onThemeSelected: (theme: Theme) => void; // Callback-Funktion, die ein Theme entgegennimmt und keinen Wert zurückgibt
    private readonly onLearningFieldSelectionRequested: () => void;

    public constructor(
        initialTheme: Theme,
        onThemeSelected: (theme: Theme) => void,
        onLearningFieldSelectionRequested: () => void
        ) {
            this.initialTheme = initialTheme;
            this.onThemeSelected = onThemeSelected;
            this.onLearningFieldSelectionRequested = onLearningFieldSelectionRequested;
    }

    public createElement(): HTMLElement {
        const mainMenuElement = document.createElement('main'); // Erzeugt das semantische main-Element für die Hauptmenüansicht

        mainMenuElement.className = 'main-menu';

        // Fügt dem erzeugten main-Element die Struktur des Hauptmenüs hinzu
        mainMenuElement.innerHTML = `
            <header class="app-header">
                <span class="version-Label">v0.2.0-dev</span>
            </header>
            
            <section class="title-section">
                <h1>Fachinformatiker Lernbegleiter</h1>
                
                <p>
                    Mobile Lernergänzung zur Prüfungsvorbereitung
                    für angehende Fachinformatiker                
                </p>            
            </section>
            
            <nav class="menu-actions" aria-label="Hauptmenü">
                <button class="menu-button" type="button" data-action="open-learning-fields">
                    Lernfeld Auswahl
                </button>
                
                <button class="menu-button" type="button" disabled>
                    Letzte Auswahl
                </button>
                
                <button class="menu-button" type="button" disabled>
                    Fehlertraining
                </button>                
            </nav>
            
            <section class="settings-section">
                <div class="toggle-group handedness-toggle">
                    <button class="toggle-button" type="button" disabled>
                        Linkshänder
                    </button>
                    
                    <button class="toggle-button" type="button" disabled>
                        Rechtshänder
                    </button>                    
                </div>
                
                <div class="toggle-group">
                    <button class="toggle-button" type="button" data-theme-option="light">
                        Helle UI
                    </button>
                    
                    <button class="toggle-button" type="button" data-theme-option="dark">
                        Dunkle UI
                    </button>
                </div>
            </section>
            
            <footer class="navigation-section">
                <button class="navigation-button" type="button" disabled>
                    Beenden
                </button>
            </footer>        
        `;

        this.initializeThemeButtons(mainMenuElement);
        this.initializeNavigation(mainMenuElement);

        return mainMenuElement;
    }

    private initializeThemeButtons(mainMenuElement: HTMLElement) {
        const themeButtons = mainMenuElement.querySelectorAll<HTMLButtonElement>('[data-theme-option]'); // Sucht alle Buttons mit einem data-theme-option-Attribut

        themeButtons.forEach((themeButton) => {
            const buttonTheme = themeButton.dataset.themeOption as Theme;
            const isActive = buttonTheme === this.initialTheme;

            themeButton.classList.toggle('active', isActive); // Fügt die CSS-Klasse active nur beim aktuell ausgewählten Theme hinzu
            themeButton.setAttribute('aria-pressed', String(isActive)); // Kennzeichnet den aktiven Umschalter auch für unterstützende Technologien
            themeButton.addEventListener('click', () => {
                this.onThemeSelected(buttonTheme);
                this.updateActiveThemeButton(themeButtons, buttonTheme);
            });
        });
    }

    private initializeNavigation(mainMenuElement: HTMLElement) {
        const learningFieldButton = mainMenuElement.querySelector<HTMLButtonElement>('[data-action="open-learning-fields"]');

        if (learningFieldButton === null) {
            throw new Error('Der Button für die Lernfeldauswahl wurde nicht gefunden');
        }

        learningFieldButton.addEventListener('click', () => this.onLearningFieldSelectionRequested());
    }

    private updateActiveThemeButton(themeButtons: NodeListOf<HTMLButtonElement>, selectedTheme: Theme): void {
        themeButtons.forEach((themeButton) => {
            const isActive = themeButton.dataset.themeOption === selectedTheme;

            themeButton.classList.toggle('active', isActive);
            themeButton.setAttribute('aria-pressed', String(isActive));
        });
    }
}