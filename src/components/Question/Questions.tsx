import React, {useEffect, useState} from 'react';
import {Firebase} from '../../models/Enums';
import {getDocuments} from '../firebase';
import {Question} from '../../models/Game';

export const Questions = () => {
    const [questions, setQuestions] = useState<Array<Question>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        const data = await getDocuments(Firebase.Questions);
        const fetchedQuestion: Array<Question> = []

        if (data) {
            data.forEach(doc => {
                const {id, answers, correctAnswer, question} = doc.data();
                let AnswersArr: any = []
                AnswersArr.push({id: 0, answer: answers[0]}, {id: 1, answer: answers[1]}, {id: 2, answer: answers[2]})

                fetchedQuestion.push({
                    id,
                    answers: AnswersArr,
                    correctAnswer,
                    question,
                })
            })
            setQuestions(fetchedQuestion)
        }
        setLoading(false)
    }

    const showFetchedQuestion = () => {
        return (
            <>
                {loading ?
                    (<h1>Loading</h1>)
                    :
                    (
                        <div>
                            {questions.map(el =>
                                <div key={el.id}>
                                    <h2>{el.question}</h2>
                                    <h3>{el.answers[el.correctAnswer].answer}</h3>
                                </div>
                            )}
                        </div>
                    )
                }
            </>
        )
    }

    return (
        <>
            <h1>Questions</h1>
            {showFetchedQuestion()}
        </>
    )
}