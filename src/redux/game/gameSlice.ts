import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Question, IGame} from "../../models/Game";

const initialState = {} as IGame;

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: {
            reducer: (state, action: PayloadAction<IGame>) => {
                return action.payload
            },
            prepare: ({questionRandomIds, questions}) => ({
                payload: {
                    questionRandomIds,
                    questions,
                    currentQuestion: 0,
                    score: 0,
                } as IGame
            })
        },
        updateCurrentQuestion(state) {
            state.currentQuestion = state.currentQuestion! + 1
        },
        updateScore(state) {
            state.score = state.score + 1
        }
    }
});

export const {startGame, updateCurrentQuestion, updateScore} = GameSlice.actions;

export default GameSlice.reducer;


    