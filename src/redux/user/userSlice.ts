import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/User";

export const UserSlice = ({
    name: 'user',
    initialState: {} as IUser,
    reducers: {
        addUser: {
            reducer: (state: IUser, action: PayloadAction<IUser>) => {
                state = action.payload
            },
            prepare: (email: string, password: string, name: string) => ({
                payload: {
                    email: email,
                    password: password,
                    name: name
                } as IUser
            })
        },
    },
});

export const {addUser} = UserSlice.reducers;

export default UserSlice.reducers;