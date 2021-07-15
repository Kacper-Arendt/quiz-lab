import {useState} from 'react';
import styled from 'styled-components';

export const Burger = styled.button<MenuIProps>`
  position: absolute;
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 3rem;
    height: 0.3rem;
    background: white;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;

export interface MenuIProps {
    isOpen: boolean,
    setIsOpen?: () => void,
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