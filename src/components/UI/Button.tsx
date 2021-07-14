import React from 'react';
import styled from "styled-components";

interface IProps {
    value?: string,
    size?: string,
    backgroundColor?: string,
    onClick?: (e: React.SyntheticEvent) => void,
}

const ButtonEl = styled.button<IProps>`
  border: .2rem solid black;
  border-radius: 2rem;
  padding: .7rem 1rem;
  margin: .8rem;
  color: white;
  font-size: ${(props: IProps) => props.size ? props.size : 'inherit'};
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'green'};
  letter-spacing: 1.2px;
  font-weight: bold;
`

export const Button = (props: IProps) => {
    return (
        <ButtonEl
            size={props.size}
            onClick={props.onClick}
        >
            {props.value}
        </ButtonEl>
    )
}