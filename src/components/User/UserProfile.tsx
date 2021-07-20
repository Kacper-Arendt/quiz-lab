import React from 'react';
import {useHistory} from 'react-router';
import styled from 'styled-components';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {logout} from '../../redux/user/userSlice';
import {auth} from '../firebase';
import avatarAvocado from '.././../images/avatarAvocado.svg'
import {Button} from '../UI/UIComponents';
import {device } from '../../models/Models';

const Profile = styled.div`
  height: 100vh;
  display: grid;
  margin: 0 1.5rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  justify-content: center;

  button {
    grid-row: 3;
    align-self: flex-end;
    margin-top: auto;
    margin-bottom: 2rem;
  }

@media${device.tablet} {
  button {
    justify-self: center;
    max-width: 30rem;
  }
}
`

const About = styled.div`
  width: 55vw;
  min-width: 25rem;
  margin: 10vh 1rem;
  padding: 1rem;
  justify-self: center;
  border: .3rem solid orange;
  background-color: rgba(0, 0, 0, .65);
  font-size: 1.5rem;

  p {
    margin: .5rem;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 11rem;
    height: 11rem;
    background-color: orange;
    border-radius: 10rem;
  }

  span {
    color: green;
    font-weight: bold;
  }
}

@media${device.tablet} {
  max-width: 35rem;
`

const SingIn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;

@media${device.tablet} {
  font-size: 2rem;
}
`
export const UserProfile = () => {
    const {user} = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const logoutHandler = async () => {
        await auth.signOut();
        dispatch(logout());
        history.push('/login')
    }
    return (
        <>
            {user.id ?
                <Profile>
                    <About>
                        <img src={avatarAvocado} alt="Avocado Avatar"/>
                        <p>Name: {user.name}</p>
                        <p>Mail: {user.email} </p>
                        <p>Total Games: <span>{user.totalGames}</span></p>
                        <p>Points Scored: <span>{user.pointsScored}</span></p>
                    </About>
                    <Button
                        onClick={logoutHandler}
                        value='Sign out'
                        size='1.5rem'/>
                </Profile>
                :
                <SingIn>
                    <h1>You're Not Logged In</h1>
                    <Button
                        onClick={() => history.push('/login')}
                        value='Sign In'
                        size='1.5rem'/>
                </SingIn>
            }
        </>
    )
}