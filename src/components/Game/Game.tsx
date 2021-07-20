import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import {setChosenAnswer, startGame, updateCurrentQuestion, updateScore} from '../../redux/game/gameSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useFetchQuestions} from '../Question/useFetchQuestions';
import {ProgressBar} from './ProgressBar';
import {UpdateUserTotalScore} from '../User/UpdateUserTotalScore';
import {changeStatus} from '../../redux/appSlice';
import {Button, Form, Spinner,} from '../UI/UIComponents';
import {AppStatus, Answer, Question} from '../../models/Models';

interface IProps {
    isChosen: boolean;
    correctAnswer: boolean;
}

const Div = styled.data`
  font-size: 1.2rem;
  text-align: center;

  h2 {
    padding: 2 .rem;
    margin: .5rem .2rem;
  }
`

const P = styled.p<IProps>`
  width: 100%;
  padding: .8rem .3rem;
  border-radius: 2rem;
  text-align: center;
  margin: 2rem 0;
  cursor: pointer;
  background-color: ${(props) => props.isChosen && '#038C33'};
  background-color: ${(props) => props.correctAnswer && '#05F240'};
  border: ${(props) => props.correctAnswer ? '3px solid #37A63E' : '2px solid orange'};
  font-weight: bold;
  color: white;
`

const Result = styled.div`
  margin: 1rem 1rem 0;
  text-align: center;

  h1 {
    margin: .7rem;
  }

  h2 {
    margin: 1rem;
  }
`

export const Game = () => {
    const dispatch = useAppDispatch();
    const {game, app, user} = useAppSelector(state => state);
    const questionRandomIds: Array<number> = [];
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const questions: Array<Question> = useFetchQuestions();
    const history = useHistory();

    useEffect(() => {
        updateUserTotalScore()
    }, [game.score, game.currentQuestion]);

    useEffect(() => {
        dispatch(startGame({questionRandomIds, questions}))
    }, [questions]);

    const updateUserTotalScore = async () => {

        if (game.currentQuestion === 5 && user.id.length > 2) {
            dispatch(changeStatus(AppStatus.Loading));
            const updatedTotalUserPoints = game.score + user.pointsScored;
            const updatedTotalGames = user.totalGames + 1;
            await UpdateUserTotalScore(user.id, updatedTotalGames, updatedTotalUserPoints);
            dispatch(changeStatus(AppStatus.Idle));
        }
    }

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
                        <ProgressBar currentQuestion={currentQuestion}/>
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
                        <Button onClick={submitAnswerHandler} value='Submit' size='1.5rem'/>
                    </>
                )
            }
        } else {
            return (
                <Result>
                    <h1>{game.score}/{game.currentQuestion}</h1>
                    {game.score > 2 ?
                        (<h2>Awesome!</h2>) :
                        (<h2>Dont Give Up!</h2>)
                    }
                    <Button value='Next Game' size='1.5rem' onClick={() => history.push('/game')}/>
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
        const nextQuestion = async () => {
            dispatch(updateCurrentQuestion());
            setCorrectAnswer(null);
        }
        setTimeout(nextQuestion, 800);
    }
    return (
        <>
            <Form>
                {app.status === AppStatus.Idle ?
                    (questionHandler())
                    :
                    <Spinner size='10'/>
                }

            </Form>

        </>
    )
}
