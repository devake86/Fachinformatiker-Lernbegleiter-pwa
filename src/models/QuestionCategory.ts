export type QuestionCategoryId =
    'facts'
    | 'terms'
    | 'abbreviations'
    | 'calculations'
    | 'subnetting'
    | 'code';

export interface QuestionCategory {
    id: QuestionCategoryId;
    label: string;
}
