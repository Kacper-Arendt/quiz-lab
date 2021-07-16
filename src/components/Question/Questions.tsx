import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {Firebase} from '../../models/Enums';
import {getDocuments} from '../firebase';
import {Question as questionModel} from '../../models/Game';
import {Spinner} from '../UI/Spinner';
import {Wrapper} from '../UI/Wrapper';

const QuestionsEl = styled.div`
  width: 75vw;
  max-width: 40rem;
  margin-bottom: 5vh;
`

const Question = styled.div`
  margin: 1.5rem .5rem;
  padding: 1rem .8rem;
  background-color: rgba(0, 0, 0, .65);
  text-align: center;
  border-bottom: 2px solid orange;

  h2 {
    margin: 1rem .1rem;
    color: green;
  }
`

const SpinnerEl = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Questions = () => {
    const [questions, setQuestions] = useState<Array<questionModel>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        const data = await getDocuments(Firebase.Questions);
        const fetchedQuestion: Array<questionModel> = []

        if (data) {
            data.forEach(doc => {
                const {id, answers, correctAnswer, question} = doc.data();
                let AnswersArr: any = []
                AnswersArr.push({id: 0, answer: answers[0]}, {id: 1, answer: answers[1]}, {id: 2, answer: answers[2]})

                fetchedQuestion.push({
                    id,
                    answers: AnswersArr,
                    correctAnswer,
                    question,
                })
            })
            setQuestions(fetchedQuestion)
        }
        setLoading(false)
    }

    const showFetchedQuestion = () => {
        return (
            <Wrapper>
                {loading ?
                    (<SpinnerEl><Spinner size='10'/> </SpinnerEl>)
                    :
                    (
                        <QuestionsEl>
                            {questions.map(el =>
                                <Question key={el.id}>
                                    <h2>Q: {el.question}</h2>
                                    <h3>{el.answers[el.correctAnswer].answer}</h3>
                                </Question>
                            )}
                        </QuestionsEl>
                    )
                }
            </Wrapper>
        )
    }

    return (
        <>
            {showFetchedQuestion()}
        </>
    )
}