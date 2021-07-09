import React, {useState} from 'react';
import { AppStatus } from '../../models/Enums';
import {changeStatus} from '../../redux/appSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {generateQuestionDocument} from '../firebase';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {Input} from '../UI/Input';
import {Spinner} from '../UI/Spinner';

export const AddQuestion = () => {
    const dispatch = useAppDispatch();
    const {app} = useAppSelector(state => state);
    const choices = [{id: 0, value: 'Answer 1'}, {id: 1, value: 'Answer 2'}, {id: 2, value: 'Answer 3'}];
    const [question, setQuestion] = useState<{ question: string, correctAnswer: number, answers: Array<object> }>();
    const [answers, setAnswers] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>();

    const setQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setQuestion({
            ...question!,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const addAnswersHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAnswers({
            ...answers,
            [parseFloat(e.currentTarget.id)]: e.currentTarget.value
        });
        setQuestion({
            ...question!,
            answers: answers
        });
    }

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(changeStatus(AppStatus.Loading))
        try {
            await generateQuestionDocument(question);
        } catch (error) {
            dispatch(changeStatus(AppStatus.Idle))
            setErrorMessage(error.message);
        }
        dispatch(changeStatus(AppStatus.Idle))
    }

    return (
        <>
            <Form onSubmit={onSubmitHandler}>
                <h1>Add question</h1>
                <Input type='text' name="question" onChange={setQuestionHandler}/>
                <div>
                    <h2>Answers</h2>
                    <Input type='text' id='0' key={0} name="0" placeholder='1' onChange={addAnswersHandler}/>
                    <Input type='text' id='1' key={1} name="1" placeholder='2' onChange={addAnswersHandler}/>
                    <Input type='text' id='2' key={2} name="2" placeholder='3' onChange={addAnswersHandler}/>
                </div>
                <h2>Correct Answer: </h2>
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
                {app.status === AppStatus.Loading ?
                    <Spinner/>
                    :
                    <Button
                        value='Add'
                        size='1.5rem'
                    />
                }
            </Form>
        </>
    )
}