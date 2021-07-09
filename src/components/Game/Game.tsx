import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {setChosenAnswer, startGame, updateCurrentQuestion, updateScore} from '../../redux/game/gameSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {questions} from './QuestionData';
import {Answer} from '../../models/Game';

interface IProps {
    isChosen: boolean;
    correctAnswer: boolean;
}

const Div = styled.data`
  font-size: 2rem;

  h2 {
    margin: 2rem;
  }
`

const P = styled.p<IProps>`
  padding: 1rem .4rem;
  border-radius: 2rem;
  text-align: center;
  margin: 2rem 0;
  cursor: pointer;
  background-color: ${(props) => props.isChosen && '#00F275'};
  background-color: ${(props) => props.correctAnswer && '#00A651'};
  border: ${(props) => props.correctAnswer ? '2px solid #008C44' : '1px solid orange'};
`

export const Game = () => {
    const dispatch = useAppDispatch();
    const {game} = useAppSelector(state => state);
    const questionRandomIds: Array<number> = [];
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

    useEffect(() => {
        getRandomIds();
        dispatch(startGame({questionRandomIds, questions}))
    }, []);

    useEffect(() => {
        questionHandler();
    }, [game.currentQuestion])

    const getRandomIds = (): void => {
        const questionIds: Array<number> = [];

        questions.map(question =>
            questionIds.push(question.id)
        );

        for (let i = 0; i < 5;) {
            let randomNumber = (Math.trunc(Math.random() * questionIds.length))
            if (!questionRandomIds.includes(randomNumber)) {
                questionRandomIds.push(randomNumber);
                i++;
            }
        }
    };

    const answeredQuestionHandler = (id: number): void => {
        dispatch(setChosenAnswer(id))
    };

    const submitAnswerHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const currentQuestion: number = game.questionRandomIds[game.currentQuestion];
        if (game.chosenAnswer == game.questions[currentQuestion].correctAnswer) {
            dispatch(updateScore());
        }
        setCorrectAnswer(game.questions[currentQuestion].correctAnswer);

        const nextQuestion = () => {
            dispatch(updateCurrentQuestion());
            setCorrectAnswer(null);
        }
        setTimeout(nextQuestion, 800);
    };

    const questionHandler = () => {
        if (game.currentQuestion <= 4) {
            if (game.questions) {
                const currentQuestion: number = game.questionRandomIds[game.currentQuestion];
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
                        <Button value='Submit' size='1.5rem'/>
                    </>
                )
            }
        } else {
            return (
                <>
                    <h1>Awesome</h1>
                    <h2>Your Score: {game.score}/{game.currentQuestion}</h2>
                </>
            )
        }
    };


    return (
        <>
            <Form onSubmit={submitAnswerHandler}>
                {questionHandler()}

            </Form>
        </>
    )
}