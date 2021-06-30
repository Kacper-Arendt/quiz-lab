import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUser} from "../../models/User";

const initialState = {id: '', name: '', email: ''} as IUser;

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state:IUser, action: PayloadAction<IUser>) {
            return action.payload;
        },
        logout(state: IUser) {
            return initialState;
        }
    },
});

export const {login, logout} = UserSlice.actions;

export default UserSlice.reducer;