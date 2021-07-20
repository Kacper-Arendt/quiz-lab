import styled from 'styled-components';
import {device} from '../../../models/MediaQueries';
import {Link} from 'react-router-dom'
import {FaHome, FaPlayCircle, FaQuestionCircle, FaUserCircle, FaPowerOff, FaUserPlus} from 'react-icons/fa';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {toggleMenu} from '../../../redux/appSlice';
import {logout} from '../../../redux/user/userSlice';
import { auth } from '../../firebase';

interface IProps {
    isOpen: boolean,
}

export const Nav = styled.nav<IProps>`
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
  transform: ${(props: IProps) => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
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
  display: flex;

  :last-child {
    position: absolute;
    bottom: 2rem;
    align-self: center;
  }

  p {
    margin-right: .8rem;
  }

  &:hover {
    color: white;
  }`

export const Navigation = () => {
    const dispatch = useAppDispatch();
    const {user, app} = useAppSelector(state => state);

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }

    const logoutHandler = async () => {
        await auth.signOut();
        dispatch(logout())
        dispatch(toggleMenu())
    }

    return (
        <Nav isOpen={app.isMenuOpen!}>
            <StyledLink to='/' onClick={toggleMenuHandler}><p>Home</p> <FaHome/></StyledLink>
            <StyledLink to='/game' onClick={toggleMenuHandler}><p>Game</p><FaPlayCircle/></StyledLink>
            <StyledLink to='/user' onClick={toggleMenuHandler}><p>Profile</p><FaUserCircle/></StyledLink>
            <StyledLink to='/questions' onClick={toggleMenuHandler}><p>Questions</p><FaQuestionCircle/></StyledLink>
            {user.id.length > 3 ?
                <StyledLink to='/home' onClick={logoutHandler}><p>Logout</p><FaPowerOff/></StyledLink>
                :
                <StyledLink to='/login' onClick={toggleMenuHandler}>Login <p><FaUserPlus /></p></StyledLink>
            }
        </Nav>

    )
}