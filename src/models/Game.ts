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