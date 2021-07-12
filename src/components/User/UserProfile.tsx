import React from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Button} from '../UI/Button';
import {logout} from '../../redux/user/userSlice';
import {useHistory} from 'react-router';
import {auth} from '../firebase';
import styled from 'styled-components';

const Profile = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  justify-content: center;

  div {
    font-size: 1.5rem;
    margin: 1rem;
    
    p{
      margin: .5rem;
    }
    img{
      width: 10rem;
      height: 10rem;
      background-color: orange;
      border-radius: 10rem;
    }
  }

  button {
    grid-row: 3;
    align-self: flex-end;
    margin-top: auto;
    margin-bottom: 2rem;
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
            <Profile>
                <div>
                    <img src="" alt=""/>
                    <p>Name: {user.name}</p>
                    <p>Mail: {user.email} </p>
                </div>
                <Button
                    onClick={logoutHandler}
                    value='Sing out'
                    size='1.5rem'/>
            </Profile>

        </>
    )
}