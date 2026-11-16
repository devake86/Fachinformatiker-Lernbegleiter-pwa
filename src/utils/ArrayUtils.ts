export function shuffledCopy<T>(values: readonly T[]): T[] { // Generische Funktion die Listen unterschiedlicher Typen mischen kann und Typ automatisch erkennt
    const shuffledValues = [...values]; // Kopie des Original-Arrays erstellen

    for (let currentIndex = shuffledValues.length -1; currentIndex > 0; currentIndex--) { // Fisher-Yates-Shuffle Algorithmus
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

        [shuffledValues[currentIndex], shuffledValues[randomIndex]] = [shuffledValues[randomIndex], shuffledValues[currentIndex]];
    }

    return shuffledValues;
}