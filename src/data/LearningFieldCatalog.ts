import type { LearningField } from '../models/LearningField.ts';

import {
    FACTS_CATEGORY,
    TERMS_CATEGORY,
    ABBREVIATIONS_CATEGORY,
    CALCULATIONS_CATEGORY,
    SUBNETTING_CATEGORY,
    CODE_CATEGORY
} from './QuestionCategoryCatalog.ts';

export const LEARNING_FIELDS: readonly LearningField[] = [
    {
        id: 'lf-01',
        label: 'Lernfeld 1',
        questionSets: [
            {
                category: FACTS_CATEGORY,
                questionFiles: [
                    'questions/lf-01/lf-01-sach-arbm.json',
                    'questions/lf-01/lf-01-sach-bwl.json',
                    'questions/lf-01/lf-01-sach-markt.json',
                    'questions/lf-01/lf-01-sach-orga.json',
                    'questions/lf-01/lf-01-sach-sozi.json',
                    'questions/lf-01/lf-01-sach-ziel.json'
                ]
            },
            {
                category: TERMS_CATEGORY,
                questionFiles: [
                    'questions/lf-01/lf-01-fach-arbm.json',
                    'questions/lf-01/lf-01-fach-bwl.json',
                    'questions/lf-01/lf-01-fach-markt.json',
                    'questions/lf-01/lf-01-fach-orga.json',
                    'questions/lf-01/lf-01-fach-sozi.json',
                    'questions/lf-01/lf-01-fach-ziel.json'
                ]
            },
            {
                category: ABBREVIATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-01/lf-01-abkz.json'
                ]
            }
        ]
    },
    {
        id: 'lf-02',
        label: 'Lernfeld 2',
        questionSets: [
            {
                category: FACTS_CATEGORY,
                questionFiles: [
                    'questions/lf-02/lf-02-sach-besch.json',
                    'questions/lf-02/lf-02-sach-hard.json',
                    'questions/lf-02/lf-02-sach-kommun.json',
                    'questions/lf-02/lf-02-sach-proj.json',
                    'questions/lf-02/lf-02-sach-recht.json',
                    'questions/lf-02/lf-02-sach-sich.json'
                ]
            },
            {
                category: TERMS_CATEGORY,
                questionFiles: [
                    'questions/lf-02/lf-02-fach-besch.json',
                    'questions/lf-02/lf-02-fach-hard.json',
                    'questions/lf-02/lf-02-fach-kalk.json',
                    'questions/lf-02/lf-02-fach-kommun.json',
                    'questions/lf-02/lf-02-fach-proj.json',
                    'questions/lf-02/lf-02-fach-recht.json'
                ]
            },
            {
                category: ABBREVIATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-02/lf-02-abkz.json'
                ]
            },
            {
                category: CALCULATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-02/lf-02-rech-finanz.json',
                    'questions/lf-02/lf-02-rech-kalk.json',
                    'questions/lf-02/lf-02-rech-wirt.json'
                ]
            }
        ]
    },
    {
        id: 'lf-03',
        label: 'Lernfeld 3',
        questionSets: [
            {
                category: FACTS_CATEGORY,
                questionFiles: [
                    'questions/lf-03/lf-03-sach-adrs.json',
                    'questions/lf-03/lf-03-sach-cloud.json',
                    'questions/lf-03/lf-03-sach-integ.json',
                    'questions/lf-03/lf-03-sach-komp.json',
                    'questions/lf-03/lf-03-sach-modl.json',
                    'questions/lf-03/lf-03-sach-secu.json',
                    'questions/lf-03/lf-03-sach-strv.json'
                ]
            },
            {
                category: TERMS_CATEGORY,
                questionFiles: [
                    'questions/lf-03/lf-03-fach-adrs.json',
                    'questions/lf-03/lf-03-fach-cloud.json',
                    'questions/lf-03/lf-03-fach-komp.json',
                    'questions/lf-03/lf-03-fach-modl.json',
                    'questions/lf-03/lf-03-fach-secu.json',
                    'questions/lf-03/lf-03-fach-strv.json'
                ]
            },
            {
                category: ABBREVIATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-03/lf-03-abkz.json'
                ]
            },
            {
                category: CALCULATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-03/lf-03-rech-netz.json'
                ]
            },
            {
                category: SUBNETTING_CATEGORY,
                questionFiles: [
                    'questions/lf-03/lf-03-subn-ipv4.json'
                ]
            }
        ]
    },
    {
        id: 'lf-04',
        label: 'Lernfeld 4',
        questionSets: [
            {
                category: FACTS_CATEGORY,
                questionFiles: [
                    'questions/lf-04/lf-04-sach-auth.json',
                    'questions/lf-04/lf-04-sach-datg.json',
                    'questions/lf-04/lf-04-sach-grds.json',
                    'questions/lf-04/lf-04-sach-kryp.json',
                    'questions/lf-04/lf-04-sach-lizn.json',
                    'questions/lf-04/lf-04-sach-malw.json',
                    'questions/lf-04/lf-04-sach-risi.json',
                    'questions/lf-04/lf-04-sach-sba.json',
                    'questions/lf-04/lf-04-sach-seng.json',
                    'questions/lf-04/lf-04-sach-tom.json'
                ]
            },
            {
                category: TERMS_CATEGORY,
                questionFiles: [
                    'questions/lf-04/lf-04-fach-auth.json',
                    'questions/lf-04/lf-04-fach-datg.json',
                    'questions/lf-04/lf-04-fach-grds.json',
                    'questions/lf-04/lf-04-fach-kryp.json',
                    'questions/lf-04/lf-04-fach-lizn.json',
                    'questions/lf-04/lf-04-fach-malw.json',
                    'questions/lf-04/lf-04-fach-risi.json',
                    'questions/lf-04/lf-04-fach-sba.json',
                    'questions/lf-04/lf-04-fach-seng.json',
                    'questions/lf-04/lf-04-fach-tom.json'
                ]
            },
            {
                category: ABBREVIATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-04/lf-04-abkz.json'
                ]
            }
        ]
    },
    {
        id: 'lf-05',
        label: 'Lernfeld 5',
        questionSets: [
            {
                category: FACTS_CATEGORY,
                questionFiles: [
                    'questions/lf-05/lf-05-sach-data.json',
                    'questions/lf-05/lf-05-sach-db.json',
                    'questions/lf-05/lf-05-sach-dev.json',
                    'questions/lf-05/lf-05-sach-modl.json',
                    'questions/lf-05/lf-05-sach-prog.json'
                ]
            },
            {
                category: TERMS_CATEGORY,
                questionFiles: [
                    'questions/lf-05/lf-05-fach-data.json',
                    'questions/lf-05/lf-05-fach-db.json',
                    'questions/lf-05/lf-05-fach-dev.json',
                    'questions/lf-05/lf-05-fach-modl.json',
                    'questions/lf-05/lf-05-fach-prog.json'
                ]
            },
            {
                category: ABBREVIATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-05/lf-05-abkz.json'
                ]
            },
            {
                category: CALCULATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-05/lf-05-rech-zahl.json'
                ]
            },
            {
                category: CODE_CATEGORY,
                questionFiles: [
                    'questions/lf-05/lf-05-code-py.json',
                    'questions/lf-05/lf-05-code-sql.json'
                ]
            }
        ]
    },
    {
        id: 'lf-06',
        label: 'Lernfeld 6',
        questionSets: [
            {
                category: FACTS_CATEGORY,
                questionFiles: [
                    'questions/lf-06/lf-06-sach-anal.json',
                    'questions/lf-06/lf-06-sach-komm.json',
                    'questions/lf-06/lf-06-sach-moni.json',
                    'questions/lf-06/lf-06-sach-serv.json',
                    'questions/lf-06/lf-06-sach-tick.json',
                    'questions/lf-06/lf-06-sach-vert.json',
                    'questions/lf-06/lf-06-sach-wart.json'
                ]
            },
            {
                category: TERMS_CATEGORY,
                questionFiles: [
                    'questions/lf-06/lf-06-fach-anal.json',
                    'questions/lf-06/lf-06-fach-komm.json',
                    'questions/lf-06/lf-06-fach-moni.json',
                    'questions/lf-06/lf-06-fach-serv.json',
                    'questions/lf-06/lf-06-fach-tick.json',
                    'questions/lf-06/lf-06-fach-vert.json',
                    'questions/lf-06/lf-06-fach-wart.json'
                ]
            },
            {
                category: ABBREVIATIONS_CATEGORY,
                questionFiles: [
                    'questions/lf-06/lf-06-abkz.json'
                ]
            }
        ]
    }
];