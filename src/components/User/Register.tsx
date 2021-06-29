import React, {useState} from 'react';
import styled from "styled-components";
import {Button} from '../UI/Button';

import {Input} from '../UI/Input';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25rem;
  margin: 5rem auto;
  padding: 2.5rem;
  border: .2rem solid black;
  border-radius: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`

export const Register = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
    });

    const submitHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        console.log(user)
        setUser({
            email: '',
            password: '',
            name: ''
        })
    };

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Form onSubmit={submitHandler}>
                <h1>Register</h1>
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
            </Form>
        </>
    )
}