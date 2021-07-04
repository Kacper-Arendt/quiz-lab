import {Question} from "../../models/Game";

export const questions: Array<Question> = [
    {
        id: 0,
        question: 'Kacper jes...',
        answers: [
            {id: 1, answer: 'Boski'},
            {id: 2, answer: 'Czarny'},
            {id: 3, answer: 'Wysoki'},
        ],
        correctAnswer: 1
    },
    {
        id: 1,
        question: 'Kacper potrafi...',
        answers: [
            {id: 1, answer: 'Nic'},
            {id: 2, answer: 'Wszystko'},
            {id: 3, answer: 'Udawać'},
        ],
        correctAnswer: 2
    },
    {
        id: 2,
        question: 'Kacper lubi',
        answers: [
            {id: 1, answer: 'ocet'},
            {id: 2, answer: 'piwo'},
            {id: 3, answer: 'lecha shandy'},],
        correctAnswer: 3
    },
    {
        id: 3,
        question: 'Kacper jeździ na ',
        answers: [
            {id: 1, answer: 'Strusiu'},
            {id: 2, answer: 'Rowerze'},
            {id: 3, answer: 'z buta chodzi'},
        ],
        correctAnswer: 2
    },
    {
        id: 4,
        question: 'Kacper dobrze',
        answers: [
            {id: 1, answer: 'Gotuje'},
            {id: 2, answer: 'Kłamie'},
            {id: 3, answer: 'Biega'},
        ],
        correctAnswer: 1
    }
]