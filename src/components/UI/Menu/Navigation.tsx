import styled from 'styled-components';
import {device} from '../../../models/MediaQueries';
import {MenuIProps} from './Burger';
import {Link } from 'react-router-dom'

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

@media${device.tablet} {
  font-size: 2.5rem;
}
`;

const StyledLink = styled(Link)`
  padding: 2rem 0;
  margin: 0 auto;
  text-align: center;
  color: black;
  font-weight: bold;
  letter-spacing: 0.5rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s linear;

  &:hover {
    color: white;
  }`

export const Navigation = (props: MenuIProps) => {

    return (
        <Nav isOpen={props.isOpen}>
            <StyledLink to='/game' onClick={props.setIsOpen}>Game</StyledLink>
            <StyledLink to='/user' onClick={props.setIsOpen}>Profile</StyledLink>
            <StyledLink to='/questions' onClick={props.setIsOpen}>questions</StyledLink>
            <StyledLink to='/' onClick={props.setIsOpen}>Home</StyledLink>
        </Nav>
    )
}