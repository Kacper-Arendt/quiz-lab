import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {setChosenAnswer, startGame, updateCurrentQuestion, updateScore} from '../../redux/game/gameSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {Answer, Question} from '../../models/Game';
import {useFetchQuestions} from '../Question/useFetchQuestions';
import {AppStatus} from '../../models/Enums';

interface IProps {
    isChosen: boolean;
    correctAnswer: boolean;
}

const Div = styled.data`
  font-size: 1.2rem;
  word-break: break-word;
  h2 {
    margin: 2rem;
  }
`

const P = styled.p<IProps>`
  padding: .8rem .3rem;
  border-radius: 2rem;
  text-align: center;
  margin: 2rem 0;
  cursor: pointer;
  background-color: ${(props) => props.isChosen && '#038C33'};
  background-color: ${(props) => props.correctAnswer && '#05F240'};
  border: ${(props) => props.correctAnswer ? '3px solid #37A63E' : '2px solid orange'};
  font-weight: bold;
`

const Result = styled.div`
  margin: 1rem 1rem 0;
  
  h1{
    margin: .7rem;
  }
  h2{
    margin: 1rem;
  }
`

export const Game = () => {
    const dispatch = useAppDispatch();
    const {game, app} = useAppSelector(state => state);
    const questionRandomIds: Array<number> = [];
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const questions: Array<Question> = useFetchQuestions();

    useEffect(() => {
        dispatch(startGame({questionRandomIds, questions}))
    }, [questions]);


    const answeredQuestionHandler = (id: number): void => {
        dispatch(setChosenAnswer(id))
    };

    const questionHandler = () => {
        if (game.currentQuestion <= 4) {
            if (game.questions) {
                const currentQuestion: number = game.currentQuestion;
                const selectedAnswerId: Answer[] = game.questions[currentQuestion].answers;

                return (
                    <>
                        <Div>
                            <h2>{game.questions[currentQuestion].question}</h2>
                            {selectedAnswerId.map(el => {
                                return <P
                                    key={el.id}
                                    isChosen={el.id === game.chosenAnswer}
                                    correctAnswer={el.id === correctAnswer}
                                    onClick={() => answeredQuestionHandler(selectedAnswerId[el.id].id)}>
                                    {game.questions[currentQuestion].answers[el.id].answer}
                                </P>
                            })}
                        </Div>
                        <Button  onClick={submitAnswerHandler} value='Submit' size='1.5rem'/>
                    </>
                )
            }
        } else {
            return (
                <Result>
                    <h1>Your Score: {game.score}/{game.currentQuestion}</h1>
                    {game.score > 2 ?
                        (<h2>Awesome!</h2>):
                        (<h2>Dont Give Up!</h2>)
                    }
                    <Button value='Next Game' size='1.5rem'/>
                </Result>
            )
        }
    };

    const submitAnswerHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const currentQuestion: number = game.currentQuestion;
        if (game.chosenAnswer === game.questions[currentQuestion].correctAnswer) {
            dispatch(updateScore());
        }
        setCorrectAnswer(game.questions[currentQuestion].correctAnswer);

        const nextQuestion = () => {
            dispatch(updateCurrentQuestion());
            setCorrectAnswer(null);
        }
        setTimeout(nextQuestion, 800);
    }
    return (
        <>
            {app.status === AppStatus.Idle ?
                <Form >
                    {questionHandler()}
                </Form>
                :
                <h1>Loading...</h1>
            }
        </>
    )
}
