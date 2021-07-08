import firebase from 'firebase';
import React, {useEffect, useState} from 'react';
import {Answer} from '../../models/Game';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {Input} from '../UI/Input';


export const AddQuestion = () => {
    const choices = [{id: 0, value: 'Answer 1'}, {id: 1, value: 'Answer 2'}, {id: 2, value: 'Answer 3'}];
    const [question, setQuestion] = useState<{ question: string, correctAnswer: number}>();

    const setQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setQuestion({
            ...question!,
            [e.target.name]: e.target.value,
        });
    };


    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(question);

    }

    return (
        <>
            <Form onSubmit={onSubmitHandler}>
                <h1>Add question</h1>
                <Input type='text' name="question" onChange={setQuestionHandler}/>
                <div>
                    <h2>Answers</h2>
                    <Input type='text' id='0' key={0} name="0" placeholder='1' onChange={setQuestionHandler}/>
                    <Input type='text' id='1' key={1} name="1" placeholder='2' onChange={setQuestionHandler}/>
                    <Input type='text' id='2' key={2} name="2" placeholder='3' onChange={setQuestionHandler}/>
                </div>
                <p>Correct Answer is: </p>
                <div>
                    {choices.map(el => {
                        return (
                            <label key={el.id} htmlFor={el.value}>
                                <input type="radio"
                                       value={el.id}
                                       key={el.id}
                                       id={el.value}
                                       name="correctAnswer"
                                       onChange={setQuestionHandler}
                                />
                                {el.value}
                            </label>
                        )
                    })}
                </div>
                <Button value="Add" size="1.5rem"/>
            </Form>
        </>
    )
}