import styled from 'styled-components';
import { device } from '../../../models/MediaQueries';
import {MenuIProps} from './Burger';

export const Nav = styled.nav<MenuIProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: orange;
  height: 100%;
  width: 100%;
  text-align: left;
  z-index: 100;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${(props: MenuIProps) => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  font-size: 2rem;

  a {
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    text-decoration: none;
    text-align: center;
    transition: color 0.2s linear;
    color: black;

    &:hover {
      color: white;
    }
  }

@media${device.tablet} {
  font-size: 3rem;
}
`;

export const Navigation = (props: MenuIProps) => {
    return (
        <Nav isOpen={props.isOpen}>
            <a href="/">Home</a>
            <a href="/game">Game</a>
            <a href="/user">Profile</a>
            <a href="/questions">Questions</a>
        </Nav>
    )
}