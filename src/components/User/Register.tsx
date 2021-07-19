import React, {useState} from 'react';
import {auth, generateUserDocument} from '../firebase';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
`;

const schema = yup.object().shape({
    email: yup.string().email().required('Email is Required'),
    password: yup.string().min(5, 'Password should be at least 5 characters').max(15),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
    name: yup.string().min(3,'Name should be at least 3 characters').max(12, 'Too long').required('Name is Required'),
})

export const Register = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const {app} = useAppSelector(state => state);
    const history = useHistory();
    const {register, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur"
    });
    const [user, setUser] = useState<INewUser>({
        id: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        totalGames: 0,
        pointsScored: 0
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const createUserWithEmailAndPasswordHandler =
        async () => {
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
                confirmPassword: '',
                name: '',
                totalGames: 0,
                pointsScored: 0,
            })
        };

    return (
        <>
            {RedirectIfUserIsAuth('/user')}
            <Form onSubmitHandler={handleSubmit(createUserWithEmailAndPasswordHandler)}>
                <H1>Register</H1>
                <Error value={errorMessage && errorMessage}/>
                <Input
                    type='email'
                    name='email'
                    value={user.email}
                    autoComplete="new-password"
                    placeholder='Email...'
                    register={{...register('email', {required: true})}}
                    onChange={updateField}
                />
                {errors.email && <Error value={errors.email.message} />}
                <Input
                    type='password'
                    name='password'
                    value={user.password}
                    placeholder='Password...'
                    register={{...register('password', {required: true})}}
                    onChange={updateField}
                />
                {errors.password && <Error value={errors.password.message} />}
                <Input
                    type='password'
                    name='confirmPassword'
                    value={user.confirmPassword}
                    placeholder='Confirm Password...'
                    register={{...register('confirmPassword', {required: true})}}
                    onChange={updateField}
                />
                {errors.confirmPassword &&  <Error value={errors.confirmPassword.message}/>}
                <Input
                    type='text'
                    name='name'
                    value={user.name}
                    autoComplete="new-password"
                    placeholder='Name...'
                    register={{...register('name', {required: true})}}
                    onChange={updateField}
                />
                {errors.name && <Error value={errors.name.message}/>}
                {app.status === AppStatus.Loading ?
                    <Spinner/>
                    :
                    <Button
                        value='Submit'
                        size='1.3rem'
                        disabled={!isValid || !isDirty}
                    />
                }
                <Link to='/login' value='Already have an account?'></Link>
            </Form>
        </>
    )
}
