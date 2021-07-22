import React from 'react';
import styled, {keyframes} from 'styled-components';
import {device} from '../../../models/Models';

const rotate = keyframes`
  0% {
    transform: translateX(-20rem) rotate(-720deg);
  }

  to {
    transform: translateX(0) rotate(0deg);
  }
`

export const Burger = styled.button<MenuIProps>`
  position: fixed;
  top: 5%;
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
  animation-name: ${rotate};
  animation-duration: .5s;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: .2rem;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    background-color: ${(props: MenuIProps) => props.isOpen ? 'black' : 'white'};

    :first-child {
      transform: ${(props: MenuIProps) => props.isOpen ? 'rotate(45deg) ' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${(props: MenuIProps) => props.isOpen ? '0' : '1'};
      transform: ${(props: MenuIProps) => props.isOpen ? 'translateX(-20px) ' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${(props: MenuIProps) => props.isOpen ? 'rotate(-45deg) ' : 'rotate(0)'};
    }
  }

@media${device.mobileM} {
  width: 2.5rem;
  height: 2.5rem;

  div {
    width: 2.5rem;
    height: .25rem;
  }
} @media${device.tablet} {
  width: 3rem;
  height: 3rem;
  left: 2rem;

  div {
    width: 3rem;
    height: .3rem;
  }
} @media${device.laptopL} {
  width: 4rem;
  height: 4rem;
  left: 3rem;

  div {
    width: 4rem;
    height: .4rem;
  }
}
`;

export interface MenuIProps {
    isOpen: boolean,
    setIsOpen?: () => void,
    logout?: () => any,
}

export const BurgerEl = (props: MenuIProps) => {
    return (
        <Burger isOpen={props.isOpen} onClick={props.setIsOpen}>
            <div></div>
            <div></div>
            <div></div>
        </Burger>
    )
}