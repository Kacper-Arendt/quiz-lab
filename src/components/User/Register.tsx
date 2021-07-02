import React, {useState} from 'react';
import {auth, generateUserDocument} from '../firebase';
import {Link, useHistory} from 'react-router-dom';

import {INewUser} from '../../models/User';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {Input} from '../UI/Input';
import {RedirectIfUserIsAuth} from './Helpers';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Status} from '../../models/app';
import {changeStatus} from '../../redux/appSlice';
import {Spinner} from '../UI/Spinner';

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
    const [errorMessage, setErrorMessage] = useState<string>();

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const createUserWithEmailAndPasswordHandler =
        async (e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(changeStatus(Status.Loading))
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
                dispatch(changeStatus(Status.Idle))
                setErrorMessage(error.message);
            }
            dispatch(changeStatus(Status.Idle))
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
                <h1>Register</h1>
                {errorMessage ? errorMessage : null}
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
            /> <Input
                type='text'
                name='name'
                value={user.name}
                onChange={updateField}
                placeholder='Name'
            />
                {app.status === Status.Loading ?
                    <Spinner/>
                    :
                    <Button
                        value='Submit'
                        size='1.5rem'
                    />
                }
                <Link to="/login">Already have an account?</Link>
            </Form>
        </>
    )
}
