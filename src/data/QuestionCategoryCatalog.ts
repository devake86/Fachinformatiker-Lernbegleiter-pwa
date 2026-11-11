import type { QuestionCategory } from "../models/QuestionCategory.ts";

export const FACTS_CATEGORY: QuestionCategory = {
    id: 'facts',
    label: 'Sachfragen'
};

export const TERMS_CATEGORY: QuestionCategory = {
    id: 'terms',
    label: 'Fachbegriffe'
};

export const ABBREVIATIONS_CATEGORY: QuestionCategory = {
    id: 'abbreviations',
    label: 'Abkürzungen'
};

export const CALCULATIONS_CATEGORY: QuestionCategory = {
    id: 'calculations',
    label: 'Berechnungen'
};

export const SUBNETTING_CATEGORY: QuestionCategory = {
    id: 'subnetting',
    label: 'Subnetting'
};

export const CODE_CATEGORY: QuestionCategory = {
    id: 'code',
    label: 'Codeausschnitte'
};

export const COMMON_CATEGORIES: readonly QuestionCategory[] = [
    FACTS_CATEGORY,
    TERMS_CATEGORY,
    ABBREVIATIONS_CATEGORY
];
