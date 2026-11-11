import type { LearningField } from "../models/LearningField.ts";
import {
    COMMON_CATEGORIES,
    CALCULATIONS_CATEGORY,
    SUBNETTING_CATEGORY,
    CODE_CATEGORY
} from "./QuestionCategoryCatalog.ts";

export const LEARNING_FIELDS: readonly LearningField[] = [
    {
        id: 'lf-01',
        label: 'Lernfeld 1',
        categories: [
            ...COMMON_CATEGORIES
        ]
    },
    {
        id: 'lf-02',
        label: 'Lernfeld 2',
        categories: [
            ...COMMON_CATEGORIES,
            CALCULATIONS_CATEGORY
        ]
    },
    {
        id: 'lf-03',
        label: 'Lernfeld 3',
        categories: [
            ...COMMON_CATEGORIES,
            CALCULATIONS_CATEGORY,
            SUBNETTING_CATEGORY
        ]
    },
    {
        id: 'lf-04',
        label: 'Lernfeld 4',
        categories: [
            ...COMMON_CATEGORIES
        ]
    },
    {
        id: 'lf-05',
        label: 'Lernfeld 5',
        categories: [
            ...COMMON_CATEGORIES,
            CALCULATIONS_CATEGORY,
            CODE_CATEGORY
        ]
    },
    {
        id: 'lf-06',
        label: 'Lernfeld 6',
        categories: [
            ...COMMON_CATEGORIES
        ]
    }
];
