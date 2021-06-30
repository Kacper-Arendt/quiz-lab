import React, {useState} from 'react';
import {auth, generateUserDocument, signInWithGoogle} from '../firebase';

import {INewUser} from '../../models/User';
import {Button} from '../UI/Button';
import {Form} from '../UI/Form';
import {Input} from '../UI/Input';

export const Register = (): JSX.Element => {
    const [user, setUser] = useState<INewUser>({
        id: '',
        email: '',
        password: '',
        name: ''
    });
    const [errorMessage, setErrorMessage] = useState<string>()

    const updateField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const createUserWithEmailAndPasswordHandler =
        async (e: React.SyntheticEvent) => {
            e.preventDefault();
            try {
                const createUser = await auth.createUserWithEmailAndPassword(user.email, user.password);
                if (createUser.user) {
                    const id = createUser.user.uid;
                    setUser({
                        ...user,
                        id: id,
                    })
                    await generateUserDocument(user, id);
                }
            } catch (error) {
                setErrorMessage(error.message)
            }
            setUser({
                id: '',
                email: '',
                password: '',
                name: ''
            })
        };

    return (
        <>
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
                <Button
                    value='Submit'
                    size='1.5rem'
                />
                <button onClick={signInWithGoogle}>Sing with google</button>
            </Form>
        </>
    )
}
