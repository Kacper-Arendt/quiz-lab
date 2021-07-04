import React, {useEffect, useState} from 'react';
import {startGame, updateCurrentQuestion, updateScore} from '../../redux/game/gameSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {questions} from './QuestionData';
import styled from 'styled-components';

const Div = styled.data`
  font-size: 2rem;

  h2 {
    margin: 2rem 0;
  }

  p {
    border: 1px solid orange;
    border-radius: 2rem;
    text-align: center;
    margin: 2rem 0;
    cursor: pointer;
  }
`

export const Game = () => {
    const dispatch = useAppDispatch();
    const {game} = useAppSelector(state => state);
    const questionRandomIds: Array<number> = [];
    const [answeredQuestion, setAnsweredQuestion] = useState<number>();
    const [score, setScore] = useState<number>(0);

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

    const setAnsweredQuestionHandler = (id: number): void => {
        setAnsweredQuestion(id);
    };

    const questionHandler = () => {
        if (game.currentQuestion <= 4) {
            if (game.questions) {
                const currentQuestion = game.questionRandomIds[game.currentQuestion];
                const selectedAnswerId = game.questions[currentQuestion].answers;
                return (
                    <Div>
                        <h2>{game.questions[currentQuestion].question}</h2>
                        <p onClick={() => setAnsweredQuestionHandler(selectedAnswerId[0].id)}>
                            {game.questions[currentQuestion].answers[0].answer}
                        </p>
                        <p onClick={() => setAnsweredQuestionHandler(selectedAnswerId[1].id)}>
                            {game.questions[currentQuestion].answers[1].answer}
                        </p>
                        <p onClick={() => setAnsweredQuestionHandler(selectedAnswerId[2].id)}>
                            {game.questions[currentQuestion].answers[2].answer}
                        </p>
                    </Div>
                )
            } else {
                return (<h1>Loading</h1>)
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

    const submitAnswerHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const currentQuestion = game.questionRandomIds[game.currentQuestion];
        if (answeredQuestion == game.questions[currentQuestion].correctAnswer) {
            dispatch(updateScore());
        }
        dispatch(updateCurrentQuestion())
    };

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