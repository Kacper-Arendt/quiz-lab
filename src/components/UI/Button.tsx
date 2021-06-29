import React from 'react';
import styled from "styled-components";

interface IProps {
    value?: string
    size?: string
    backgroundColor?: string
}

const ButtonEl = styled.button<IProps>`
  border: .2rem solid black;
  border-radius: 2rem;
  padding: .5rem .7rem;
  margin: .5rem;
  color: white;
  font-size: ${(props: IProps) => props.size ? props.size : 'inherit'};
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'green'};
`

export const Button = (props: IProps) => {
    return (
        <ButtonEl
            size={props.size}
        >
            {props.value}
        </ButtonEl>
    )
}