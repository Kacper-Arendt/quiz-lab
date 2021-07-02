import React from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Button} from '../UI/Button';
import {logout} from '../../redux/user/userSlice';
import { useHistory } from 'react-router';
import { auth } from '../firebase';

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
            <div>
                <h1>Hello: {user.name}</h1>
                <p>Your mail: {user.email} </p>
                <Button
                    onClick={logoutHandler}
                    value='Sing out'
                    size='1.5rem'/>
            </div>
        </>
    )
}