import styled from 'styled-components';
import { MenuIProps } from './Burger';

export const Nav = styled.nav<MenuIProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: red;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${ (props: MenuIProps) => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};


  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: white;
    }
  }
`;

export const Navigation = (props: MenuIProps) => {
    return (
        <Nav isOpen={props.isOpen} >
            <a href="/">
                About us
            </a>
            <a href="/">
                Pricing
            </a>
            <a href="/">
                Contact
            </a>
        </Nav>
    )
}