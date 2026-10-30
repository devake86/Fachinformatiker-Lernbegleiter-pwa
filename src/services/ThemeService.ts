export type Theme = 'light' | 'dark'; // Der Union-Type erlaubt ausschließlich die Werte 'light' und 'dark'

export class ThemeService {
    private static readonly STORAGE_KEY = 'filb-theme'; // Schlüssel, unter dem das ausgewählte Theme im localStorage gespeichert wird
    private static readonly DEFAULT_THEME: Theme = 'dark';

    private currentTheme: Theme;

    public constructor() {
        this.currentTheme = this.loadStoredTheme();
    }

    public getCurrentTheme(): Theme {
        return this.currentTheme;
    }

    public applyTheme(theme: Theme): void {
        this.currentTheme = theme;

        document.documentElement.dataset.theme = theme;
        localStorage.setItem(ThemeService.STORAGE_KEY, theme); // Speichert beispielsweise das Schlüssel-Wert-Paar 'filb-theme' und 'light'
    }

    private loadStoredTheme(): Theme {
        const storedTheme = localStorage.getItem(ThemeService.STORAGE_KEY);

        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
        }

        return ThemeService.DEFAULT_THEME;
    }
}