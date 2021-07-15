import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
import {AppStatus} from '../../models/Enums';
import {LinkEl as Link} from '../UI/Link'
import {Error} from '../UI/ErrorMesage';


const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
});

export const UserLogin = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const {app} = useAppSelector(state => state);
    const {register, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur"
    });
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
        try {
            dispatch(changeStatus(AppStatus.Loading))
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
            dispatch(changeStatus(AppStatus.Idle))
        } catch
            (error) {
            setError(error.message);
            dispatch(changeStatus(AppStatus.Idle))
        }
        setFormData({
            email: '',
            password: ''
        })
    };
    return (
        <>
            {RedirectIfUserIsAuth('/user')}
            <Form onSubmitHandler={handleSubmit(signInWithEmailAndPasswordHandler)}>
                <h1>Login</h1>
                <Error value={error && error}/>
                <Input
                    type='email'
                    name='email'
                    value={formData.email}
                    autoComplete="new-password"
                    placeholder='Email'
                    register={{...register('email', {required: true})}}
                    onChange={updateField}
                />
                {errors.email && <Error value={errors.email.message}/>}
                <Input
                    type='password'
                    name='password'
                    value={formData.password}
                    placeholder='Password'
                    register={{...register('password', {required: true})}}
                    onChange={updateField}
                />
                {errors.password && <Error value={errors.password.message}/>}
                {app.status === AppStatus.Loading ?
                    <Spinner/>
                    :
                    <Button
                        value='Submit'
                        size='1.3rem'
                        disabled={!isValid || !isDirty}
                    />
                }
                <Link to='/register' value='Create an account'></Link>
            </Form>
        </>
    )
}