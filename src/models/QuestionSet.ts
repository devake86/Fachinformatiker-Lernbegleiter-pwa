import type { QuestionCategory } from "./QuestionCategory.ts";

export interface QuestionSet {
    category: QuestionCategory;
    questionFiles: readonly string[];
}