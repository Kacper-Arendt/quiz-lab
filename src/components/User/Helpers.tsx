import React from 'react';
import {Redirect} from 'react-router';
import {useAppSelector} from '../../redux/hooks';

export const RedirectIfUserIsAuth = (path: string) => {
    const {user} = useAppSelector(state => state);

    if (user.isAuth === true) {
        return <Redirect to={path}/>
    }
}