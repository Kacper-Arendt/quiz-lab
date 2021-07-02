import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {IUser} from '../../models/User';
import {auth, getUserDocument} from '../firebase';
import {Button} from '../UI/Button';
import {Input} from '../UI/Input';
import {Form} from '../UI/Form';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {login} from '../../redux/user/userSlice';
import {RedirectIfUserIsAuth} from './Helpers';
import {Spinner} from '../UI/Spinner';
import {changeStatus} from '../../redux/appSlice';
import {Status} from '../../models/app';

export const UserLogin = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const {app} = useAppSelector(state => state);
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const [fetchedUser, setFetchedUser] = useState({
        id: '',
        name: '',
        email: '',
        isAuth: false,
    });

    useEffect(() => {
        dispatch(login(fetchedUser as IUser));
    }, [fetchedUser, dispatch])

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const signInWithEmailAndPasswordHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            dispatch(changeStatus(Status.Loading))
            const userLogin = await auth.signInWithEmailAndPassword(formData.email, formData.password);
            if (userLogin.user) {
                const userId = userLogin.user.uid;
                const response = await getUserDocument(userId);
                if (response) {
                    setFetchedUser({
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        isAuth: true,
                    })
                }
            }
            dispatch(changeStatus(Status.Idle))
        } catch
            (error) {
            setError(error.message);
            dispatch(changeStatus(Status.Idle))
        }
    };
    return (
        <>
            {RedirectIfUserIsAuth('/user')}
            <Form onSubmit={signInWithEmailAndPasswordHandler}>
                <h1>Login</h1>
                {error ? error : null}
                <Input
                    type='text'
                    name='email'
                    value={formData.email}
                    onChange={updateField}
                    placeholder='Email'
                /> <Input
                type='password'
                name='password'
                value={formData.password}
                onChange={updateField}
                placeholder='Password'
            />
                {app.status === Status.Loading ?
                    <Spinner/>
                    :
                    <Button
                        value='Submit'
                        size='1.5rem'
                    />
                }
                <Link to="/register">Don't have an account?</Link>
            </Form>
        </>
    )
}