import {Question} from "../../models/Game";

export const questions: Array<Question> = [
    {
        id: 0,
        question: 'Kacper jes...',
        answers: [
            {id: 0, answer: 'Boski'},
            {id: 1, answer: 'Czarny'},
            {id: 2, answer: 'Wysoki'},
        ],
        correctAnswer: 0,
    },
    {
        id: 1,
        question: 'Kacper potrafi...',
        answers: [
            {id: 0, answer: 'Nic'},
            {id: 1, answer: 'Wszystko'},
            {id: 2, answer: 'Udawać'},
        ],
        correctAnswer: 1,
    },
    {
        id: 2,
        question: 'Kacper lubi',
        answers: [
            {id: 0, answer: 'ocet'},
            {id: 1, answer: 'piwo'},
            {id: 2, answer: 'lecha shandy'},
        ],
        correctAnswer: 2,
    },
    {
        id: 3,
        question: 'Kacper jeździ na ',
        answers: [
            {id: 0, answer: 'Strusiu'},
            {id: 1, answer: 'Rowerze'},
            {id: 2, answer: 'z buta chodzi'},
        ],
        correctAnswer: 1,
    },
    {
        id: 4,
        question: 'Kacper dobrze',
        answers: [
            {id: 0, answer: 'Gotuje'},
            {id: 1, answer: 'Kłamie'},
            {id: 2, answer: 'Biega'},
        ],
        correctAnswer: 0,
    },
]