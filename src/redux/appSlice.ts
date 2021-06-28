import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IApp, Status} from "../models/app";

const initialState = {status: Status.Idle} as IApp;

export const appSlice = createSlice({
    name: 'app,',
    initialState,
    reducers: {
        changeStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        }
    }
})

export const {changeStatus, setMessage} = appSlice.actions;

export default appSlice.reducer;