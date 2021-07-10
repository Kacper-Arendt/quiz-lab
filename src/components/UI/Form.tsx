import React from 'react';
import styled from "styled-components";

interface IProps {
    onSubmit?: (e: React.SyntheticEvent) => void,
    onChange?: (e: React.ChangeEvent<any>)=> void,
    children: React.ReactNode
}

const FormEl = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  margin: 5rem auto;
  padding: 2.5rem;
  border: .2rem solid black;
  border-radius: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`

export const Form = (props: IProps) => {
    return (
        <FormEl onSubmit={props.onSubmit} onChange={props.onChange}>
            {props.children}
        </FormEl>
    )
}