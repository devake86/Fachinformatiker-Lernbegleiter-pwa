import type { QuestionPool } from '../models/QuestionPool.ts';
import type { QuizQuestion } from '../models/QuizQuestion.ts';
import { shuffledCopy } from '../utils/ArrayUtils.ts';

export class QuizRoundFactory {
    private static readonly DEFAULT_MAXIMUM_QUESTION_COUNT = 20;

    public createRound(
        questionPools: readonly QuestionPool[],
        maximumQuestionCount: number = QuizRoundFactory.DEFAULT_MAXIMUM_QUESTION_COUNT
    ): QuizQuestion[] {
        if (!Number.isInteger(maximumQuestionCount) || maximumQuestionCount <= 0) {
            throw new Error('Die maximale Fragenanzahl muss eine positive Ganzzahl sein.');
        }

        const availableQuestionPools = questionPools.map((questionPool) => shuffledCopy(questionPool.questions)).filter((questionPool) => questionPool.length > 0); // Kopierte Pools mischen und leere Pools entfernen

        const selectedQuestions: QuizQuestion[] = [];

        while (selectedQuestions.length < maximumQuestionCount && availableQuestionPools.length > 0) {
            for (let poolIndex = availableQuestionPools.length - 1; poolIndex >= 0; poolIndex--) { // Per Round-Robin den Pools bis zu 20 Fragen entnehmen und Fragenpool hinzufügen
                const questionPool = availableQuestionPools[poolIndex];
                const selectedQuestion = questionPool.pop();

                if (selectedQuestion !== undefined) {
                    selectedQuestions.push(selectedQuestion);
                }

                if (questionPool.length === 0) {
                    availableQuestionPools.splice(poolIndex, 1);
                }

                if (selectedQuestions.length === maximumQuestionCount) {
                    break;
                }
            }
        }

        return shuffledCopy(selectedQuestions); // Gemischten Pool zurückgeben
    }
}