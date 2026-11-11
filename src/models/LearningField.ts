import type { QuestionCategory } from "./QuestionCategory.ts";

export type LearningFieldId =
    'lf-01'
    | 'lf-02'
    | 'lf-03'
    | 'lf-04'
    | 'lf-05'
    | 'lf-06';

export interface LearningField {
    id: LearningFieldId;
    label: string;
    categories: readonly QuestionCategory[];
}