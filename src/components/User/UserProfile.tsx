import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Button} from '../UI/Button';
import {logout} from '../../redux/user/userSlice';


export const UserProfile = () => {
    const {user} = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [user])

    const logoutHandler = (): void => {
        dispatch(logout());
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