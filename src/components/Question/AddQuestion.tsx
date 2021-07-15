import React, {useState} from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {AppStatus} from '../../models/Enums';
import {changeStatus} from '../../redux/appSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {generateQuestionDocument} from '../firebase';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {Input} from '../UI/Input';
import {Spinner} from '../UI/Spinner';
import {Error} from '../UI/ErrorMesage';

const Answers = styled.div`
  text-align: center;
  width: 100%;
`

const CorrectAnswers = styled(Answers)`
  width: 75%;
  padding: .7rem .5rem;
  background-color: rgba(0, 0, 0, .65);
  border-radius: 2rem;
  margin: 1.5rem 0 1rem;

  h2 {
    color: green;
  }

  label {
    display: flex;
    justify-content: center;
    margin: .7rem .5rem;
  }

  p {
    margin: 0 .5rem;
    font-weight: 600;
  }
`
const schema = yup.object().shape({
    question: yup.string().min(5, 'Question should be at least 5 characters').max(100, 'Too long').required('Question is required'),
    correctAnswer: yup.number().nullable().required('Correct Answer is required'),
    0: yup.string().min(3, 'Answer 1 should be at least 3 characters').max(25, 'Too long').required('Answer is required'),
    1: yup.string().min(3, 'Answer 2 should be at least 3 characters').max(25, 'Too long').required('Answer is required'),
    2: yup.string().min(3, `Answer 3 should be at least 3 characters`).max(25, 'Too long').required('Answer is required'),

});

export const AddQuestion = () => {
    const dispatch = useAppDispatch();
    const {app} = useAppSelector(state => state);
    const {register, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur"
    });
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
            <Form onSubmitHandler={handleSubmit(onSubmitHandler)}>
                <h1>Add Question</h1>
                <Input
                    type='text'
                    name="question"
                    autoComplete='off'
                    register={{...register('question', {required: true})}}
                    onChange={setQuestionHandler}
                />
                {errors.question && <Error value={errors.question.message}/>}
                <Answers>
                    <h2>Answers</h2>
                    <Input
                        type='text'
                        id='0'
                        key={0} name="0"
                        placeholder='1'
                        autoComplete='off'
                        register={{...register('0', {required: true})}} onChange={addAnswersHandler}
                    />
                    {errors[0] && <Error value={errors[0].message}/>}
                    <Input
                        type='text'
                        id='1' key={1}
                        name="1"
                        placeholder='2'
                        autoComplete='off'
                        register={{...register('1', {required: true})}} onChange={addAnswersHandler}
                    />
                    {errors[1] && <Error value={errors[1].message}/>}
                    <Input
                        type='text'
                        id='2' key={2}
                        name="2"
                        placeholder='3'
                        autoComplete='off'
                        register={{...register('2', {required: true})}} onChange={addAnswersHandler}
                    />
                    {errors[2] && <Error value={errors[2].message}/>}
                </Answers>
                <CorrectAnswers>
                    <h2>Correct Answer </h2>
                    {choices.map(el => {
                        return (
                            <label key={el.id} htmlFor={el.value}>
                                <input
                                    type="radio"
                                    value={el.id}
                                    key={el.id}
                                    id={el.value}
                                    {...register('correctAnswer', {required: true})}
                                    onChange={setQuestionHandler}
                                />
                                <p>{el.value}</p>
                            </label>
                        )
                    })}
                    {errors.correctAnswer && <Error value={errors.correctAnswer.message}/>}

                </CorrectAnswers>
                {app.status === AppStatus.Loading ?
                    <Spinner/>
                    :
                    <Button
                        value='Submit'
                        size='1.5rem'
                        disabled={!isValid || !isDirty}
                    />
                }
            </Form>
        </>
    )
}