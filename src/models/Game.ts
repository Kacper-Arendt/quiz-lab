export interface Question {
    id: string,
    question: string,
    answers: Array<Answer>,
    correctAnswer: number,
}

export interface AnsweredQuestion  extends Question{
    chosenAnswer: number | null,

}

export interface Answer {
    id: number,
    answer: string,
}

export interface IGame {
    questionRandomIds: number[],
    currentQuestion: number,
    questions: Array<AnsweredQuestion>,
    score: number,
    chosenAnswer?: number | null,
}