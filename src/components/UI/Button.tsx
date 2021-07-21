import React from 'react';
import styled from "styled-components";

interface IProps {
    value?: string,
    size?: string,
    backgroundColor?: string,
    disabled?: boolean,
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
  transition: all .3s;

  :hover {
    transform: scale(1.05);
    -webkit-box-shadow: 0px 0px 10px 0px #000;
    box-shadow: 0px 0px 10px 0px #000;
  }

  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    transform: scale(1);
  }

  :disabled {
    background-color: grey;
  }
`

export const Button = (props: IProps) => {
    return (
        <ButtonEl
            size={props.size}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.value}
        </ButtonEl>
    )
}