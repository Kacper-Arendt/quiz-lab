import React from 'react';
import styled from "styled-components";

import {Input} from '../UI/Input';

const Form = styled.form`
  width: 25rem;
  margin: auto;
`

export const Register = () => {
    return (
        <>
            <Form action="">
                <Input
                    type='text'
                    placeholder='Email'
                />   <Input
                    type='password'
                    placeholder='Password'
                /> <Input
                type='text'
                placeholder='Name'
            />
                <button>Submit</button>
            </Form>
        </>
    )
}