import React, {useEffect} from 'react';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {data} from './QuestionData'

export const Game = () => {
    const questionIds: Array<number> = []
    const questionRandomIds: Array<number> = []

    data.map(question =>
        questionIds.push(question.id)
    )

    const getRandomId = () => {
        for (let i = 0; i < 5;) {
            let randomNumber = (Math.trunc(Math.random() * questionIds.length))
            if (!questionRandomIds.includes(randomNumber)) {
                questionRandomIds.push(randomNumber);
                i++;
            }
        }
        return questionRandomIds;
    }

    return (
        <>
            <Form onSubmit={getRandomId} >
                <h2>Question {data[1].question}</h2>
                <div>
                    <p>Choice 1</p>
                    <p>Choice 2</p>
                    <p>Choice 3</p>
                </div>
                <Button
                    value='Submit'
                    size='1.5rem'
                />
            </Form>
        </>
    )
}