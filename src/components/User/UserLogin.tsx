import React, {useState} from 'react';
import {IUser} from '../../models/User';

import {auth, getUserDocument, signInWithGoogle} from '../firebase';
import {Button} from '../UI/Button';
import {Input} from '../UI/Input';
import {Form} from '../UI/Form';
import {useAppDispatch} from '../../redux/hooks';
import {login} from '../../redux/user/userSlice';

export const UserLogin = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState({email: '', password: ''});
    const [error, setError] = useState('');

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const signInWithEmailAndPasswordHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const userLogin = await auth.signInWithEmailAndPassword(user.email, user.password);
            if (userLogin.user) {
                const userId = userLogin.user.uid;
                const response = await getUserDocument(userId);
                dispatch(login(response as IUser));
            }
        } catch
            (error) {
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