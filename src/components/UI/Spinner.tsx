import React from 'react';
import styled from 'styled-components';

interface IProps {
    size?: string,
}

const Span = styled.div<IProps>`
  display: inline-block;

  :after {
    content: " ";
    display: block;
    width: ${(props: IProps) => props.size ? props.size + 'rem' : '3rem'};
    height: ${(props: IProps) => props.size ? props.size + 'rem' : '3rem'};
    margin: .5rem;
    border-radius: 50%;
    border: .5rem solid orange;
    border-color: orange transparent orange transparent;
    animation: lds-dual-ring .7s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const Spinner = (props: IProps): JSX.Element => {
    return (
        <Span size={props.size}></Span>
    );
}