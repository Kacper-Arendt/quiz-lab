import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IApp} from "../models/app";
import {AppStatus} from '../models/Enums';

const initialState = {status: AppStatus.Idle, isMenuOpen: false} as IApp;

export const appSlice = createSlice({
    name: 'app,',
    initialState,
    reducers: {
        changeStatus(state, action: PayloadAction<AppStatus>) {
            state.status = action.payload;
        },
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload;
        },
        toggleMenu(state) {
            state.isMenuOpen = !state.isMenuOpen;
        }
    }
})

export const {changeStatus, setMessage, toggleMenu} = appSlice.actions;

export default appSlice.reducer;