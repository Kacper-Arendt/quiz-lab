import React, {useState} from 'react';
import {BurgerEl} from './Burger';
import {Navigation} from './Navigation';

export const Menu = () => {
    const [open, setOpen] = useState<boolean>(false);

    const isOpenHandler = () => {
        setOpen(!open)
    }

    return (
        <div>
            <BurgerEl isOpen={open} setIsOpen={isOpenHandler}/>
            <Navigation isOpen={open} setIsOpen={isOpenHandler}/>
        </div>
    )
}