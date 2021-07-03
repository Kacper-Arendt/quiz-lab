import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Question, IGame} from "../../models/Game";

const initialState = [] as IGame[];

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame(state, action) {
            return action.payload
        }
    }
});

export const {startGame} = GameSlice.actions;

export default GameSlice.reducer;


    