import React, {useEffect} from 'react';
import {Firebase} from '../../models/Enums';
import {getDocuments} from '../firebase';

export const Questions = () => {

    const fetchQuestions = async () => {
        const data = await getDocuments(Firebase.Questions);
        if (data) {
            data.forEach(doc => {
                console.log(doc.data())
            })
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, [])

    return (
        <>
            <h1>Questions</h1>
        </>
    )
}