import React from 'react';
import {toggleMenu} from '../../../redux/appSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {logout} from '../../../redux/user/userSlice';
import {BurgerEl} from './Burger';
import {Navigation} from './Navigation';

export const Menu = () => {
    const {app} = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(toggleMenu())
    }

    return (
        <div>
            <BurgerEl isOpen={app.isMenuOpen!} setIsOpen={() => dispatch(toggleMenu())}/>
            <Navigation isOpen={app.isMenuOpen!} setIsOpen={() => dispatch(toggleMenu())}
                        logout={logoutHandler}/>
        </div>
    )
};