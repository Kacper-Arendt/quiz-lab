export interface Question {
    id: number,
    question: string,
    answers: Array<Answer>,
    correctAnswer: number,
    chosenAnswer: number | null,
}

export interface Answer {
    id: number,
    answer: string,
}

export interface IGame {
    questionRandomIds: number[],
    currentQuestion: number,
    questions: Array<Question>,
    score: number,
    chosenAnswer?: number | null,
}