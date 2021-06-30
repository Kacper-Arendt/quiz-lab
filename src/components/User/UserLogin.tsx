import React, {useState} from 'react';
import styled from "styled-components";
import {IUser} from '../../models/User';

import {auth, generateUserDocument, getUserDocument, signInWithGoogle} from '../firebase';
import {Button} from '../UI/Button';
import {Input} from '../UI/Input';
import {Form} from '../UI/Form';

export const UserLogin = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const signInWithEmailAndPasswordHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const login = await auth.signInWithEmailAndPassword(user.email, user.password);
            if (login.user) {
                const userId = login.user.uid;
                const getUserData = await getUserDocument(userId);
                console.log(getUserData);
            }
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <>
            <Form onSubmit={signInWithEmailAndPasswordHandler}>
                <h1>Login</h1>
                {error ? error : null}
                <Input
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={updateField}
                    placeholder='Email'
                /> <Input
                type='password'
                name='password'
                value={user.password}
                onChange={updateField}
                placeholder='Password'
            />
                <Button
                    value='Submit'
                    size='1.5rem'
                />
                <button onClick={signInWithGoogle}>Sing with google</button>
            </Form>
        </>
    )
}