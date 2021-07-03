import React, {useEffect, useState} from 'react';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {data} from './QuestionData'

export const Game = () => {
    const dispatch = useAppDispatch();
    
    const questionIds: Array<number> = []
    const questionRandomIds: Array<number> = []
    const [answeredQuestion, setAnsweredQuestion] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        data.map(question =>
            questionIds.push(question.id)
        )
        getRandomId();
    }, []);

    useEffect(() => {
        questionHandler()
        setCurrentQuestion(answeredQuestion)
    }, [answeredQuestion])

    const questionHandler = () => {
        if (answeredQuestion <= 4) {
            return (
                <div>
                    <h2>{data[currentQuestion].question}</h2>
                    <p> ID {data[currentQuestion].id} </p>
                    <p> Answered question {answeredQuestion} </p>
                    <p> {data[currentQuestion].answers[0].answer}</p>
                    <p> {data[currentQuestion].answers[1].answer}</p>
                    <p> {data[currentQuestion].answers[2].answer}</p>
                </div>
            )
        } else {
            return (
                <h1>Awesome </h1>
            )
        }
    };

    const getRandomId = () => {
        for (let i = 0; i < 5;) {
            let randomNumber = (Math.trunc(Math.random() * questionIds.length))
            if (!questionRandomIds.includes(randomNumber)) {
                questionRandomIds.push(randomNumber);
                i++;
            }
        }
    }

    const submitAnswerHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setAnsweredQuestion(answeredQuestion +1);
    }

    return (
        <>
            <Form onSubmit={submitAnswerHandler}>
                {questionHandler()}
                <Button
                    value='Submit'
                    size='1.5rem'
                />
            </Form>
        </>
    )
}