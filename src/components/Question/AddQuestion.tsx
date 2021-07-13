import React, {useState} from 'react';
import styled from 'styled-components';
import {AppStatus} from '../../models/Enums';
import {changeStatus} from '../../redux/appSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {generateQuestionDocument} from '../firebase';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {Input} from '../UI/Input';
import {Spinner} from '../UI/Spinner';

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 19rem;
`

const CorrectAnswers = styled(Answers)`
  width: 18rem;
  padding: .7rem .5rem;
  background-color: rgba(0, 0, 0, .65);
  border-radius: 2rem;
  margin-bottom: 1rem;


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
  }
`

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
                <h1>Add Question</h1>
                <Input type='text' name="question" onChange={setQuestionHandler} autoComplete='off'/>
                <Answers>
                    <h2>Answers</h2>
                    <Input type='text' id='0' key={0} name="0" placeholder='1' onChange={addAnswersHandler}
                           autoComplete='off'/>
                    <Input type='text' id='1' key={1} name="1" placeholder='2' onChange={addAnswersHandler}
                           autoComplete='off'/>
                    <Input type='text' id='2' key={2} name="2" placeholder='3' onChange={addAnswersHandler}
                           autoComplete='off'/>
                </Answers>
                <CorrectAnswers>
                    <h2>Correct Answer: </h2>
                    {choices.map(el => {
                        return (
                            <label key={el.id} htmlFor={el.value}>
                                <input
                                    type="radio"
                                    value={el.id}
                                    key={el.id}
                                    id={el.value}
                                    name="correctAnswer"
                                    onChange={setQuestionHandler}
                                />
                                <p>{el.value}</p>
                            </label>
                        )
                    })}
                </CorrectAnswers>
                {app.status === AppStatus.Loading ?
                    <Spinner/>
                    :
                    <Button
                        value='Submit'
                        size='1.5rem'
                    />
                }
            </Form>
        </>
    )
}