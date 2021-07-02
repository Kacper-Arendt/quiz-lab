import React from 'react';
import styled from 'styled-components';

const Span = styled.div`
  display: inline-block;

  :after {
    content: " ";
    display: block;
    width: 2rem;
    height: 2rem;
    margin: .5rem;
    border-radius: 50%;
    border: .3rem solid black;
    border-color: black transparent black transparent;
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

export const Spinner = (): JSX.Element => {
    return (
            <Span></Span>
    );
}