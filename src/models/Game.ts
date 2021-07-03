export interface Question {
    id: number,
    question: string,
    answers: Array<Answer>,
    correctAnswer: number
}

interface Answer {
    id: number,
    answer: string
}

export interface IGame {
    questionIDs: Array<number>,
    currentQuestion: number,
    question?: Array<Question>,
}