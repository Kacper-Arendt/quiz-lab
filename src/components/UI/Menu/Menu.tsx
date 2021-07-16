import React from 'react';
import {toggleMenu} from '../../../redux/appSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {BurgerEl} from './Burger';
import {Navigation} from './Navigation';


export const Menu = () => {
    const {app} = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    return (
        <div>
            <BurgerEl isOpen={app.isMenuOpen!} setIsOpen={() => dispatch(toggleMenu())}/>
            <Navigation isOpen={app.isMenuOpen!} />
        </div>
    )
}