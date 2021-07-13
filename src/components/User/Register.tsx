import React, {useState} from 'react';
import {auth, generateUserDocument} from '../firebase';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {INewUser} from '../../models/User';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {Input} from '../UI/Input';
import {RedirectIfUserIsAuth} from './Helpers';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {changeStatus} from '../../redux/appSlice';
import {Spinner} from '../UI/Spinner';
import {AppStatus} from '../../models/Enums';
import {LinkEl as Link} from '../UI/Link'
import {Error} from '../UI/ErrorMesage';

const H1 = styled.h1`
  margin-bottom: 1rem;
  font-size: 2.4rem;
`

export const Register = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const {app} = useAppSelector(state => state);
    const history = useHistory();
    const [user, setUser] = useState<INewUser>({
        id: '',
        email: '',
        password: '',
        name: ''
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const createUserWithEmailAndPasswordHandler =
        async (e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(changeStatus(AppStatus.Loading))
            try {
                const createUser = await auth.createUserWithEmailAndPassword(user.email, user.password);
                if (createUser.user) {
                    const id = createUser.user.uid;
                    setUser({
                        ...user,
                        id: id,
                    })
                    await generateUserDocument(user, id);
                    history.push('/login');
                }
            } catch (error) {
                dispatch(changeStatus(AppStatus.Idle))
                setErrorMessage(error.message);
            }
            dispatch(changeStatus(AppStatus.Idle))
            setUser({
                id: '',
                email: '',
                password: '',
                name: ''
            })
        };

    return (
        <>
            {RedirectIfUserIsAuth('/user')}
            <Form onSubmit={createUserWithEmailAndPasswordHandler}>
                <H1>Register</H1>
                <Error value={errorMessage && errorMessage }/>
                <Input
                    type='email'
                    name='email'
                    value={user.email}
                    autoComplete="new-password"
                    placeholder='Email'
                    onChange={updateField}
                /> <Input
                type='password'
                name='password'
                value={user.password}
                placeholder='Password'
                onChange={updateField}
            /> <Input
                type='text'
                name='name'
                value={user.name}
                autoComplete="new-password"
                placeholder='Name'
                onChange={updateField}
            />
                {app.status === AppStatus.Loading ?
                    <Spinner/>
                    :
                    <Button
                        value='Submit'
                        size='1.3rem'
                    />
                }
                <Link to='/login' value='Already have an account?'></Link>
            </Form>
        </>
    )
}
