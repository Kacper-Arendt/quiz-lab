import React from 'react';
import styled from 'styled-components';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Button} from '../UI/Button';
import {logout} from '../../redux/user/userSlice';
import {useHistory} from 'react-router';
import {auth} from '../firebase';
import avatarAvocado from '.././../images/avatarAvocado.svg'
import {device} from '../../models/MediaQueries';

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
  button{
    max-width: 30rem;
  }
}
`

const About = styled.div`
  font-size: 1.5rem;
  margin: 2rem 1rem;
  background-color: rgba(0, 0, 0, .65);
  padding: 1rem;
  border: .3rem solid orange;

  p {
    margin: .5rem;
  }

  img {
    margin: 1rem 25%;
    width: 11rem;
    height: 11rem;
    justify-self: center;
    background-color: orange;
    border-radius: 10rem;
  }
`

const SingIn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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