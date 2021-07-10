import {useEffect, useState} from 'react';
import {Firebase} from '../../models/Enums';
import {Question} from '../../models/Game';
import {getDocuments} from '../firebase';

export const useFetchQuestions = () => {
    const [questions, setQuestions] = useState<Array<Question>>([]);

    const data = async () => {
        const fetchedQuestion: Array<Question> = [];
        const dataArr = await getDocuments(Firebase.Questions);
        if (dataArr) {
            dataArr.forEach(doc => {
                const {id, answers, correctAnswer, question} = doc.data();
                let AnswersArr: any = [];
                AnswersArr.push({id: 0, answer: answers[0]}, {id: 1, answer: answers[1]}, {id: 2, answer: answers[2]});

                fetchedQuestion.push({
                    id,
                    answers: AnswersArr,
                    correctAnswer,
                    question,
                });
            })
            setQuestions(fetchedQuestion);
        }
    }

    useEffect(() => {
        data();
    }, []);

    return questions;
}