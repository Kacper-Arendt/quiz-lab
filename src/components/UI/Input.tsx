import React from 'react';
import styled from "styled-components";

interface IProps {
    type: string,
    name: string,
    value: string,
    placeholder: string,
    backgroundColor?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const InputEl = styled.input<IProps>`
  width: 100%;
  margin: .8rem;
  padding: 0.7rem;
  border: .15rem solid black;
  border-radius: 3rem;
  font-size: inherit;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  outline: none;
  background-color: ${(props: IProps) => props.backgroundColor ? props.backgroundColor : 'white'};
  transition: all 0.4s;

  :hover, :focus {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    transform: scale(1.02);
  }

  :focus {
    transform: scale(1.05);
    background-color: aqua;
    border: .2rem solid black;
  }
`

export const Input = (props: IProps) => {
    return (
        <>
            <InputEl
                type={props.type}
                name = {props.name}
                value = {props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                backgroundColor={props.backgroundColor}
            />
        </>
    )
}