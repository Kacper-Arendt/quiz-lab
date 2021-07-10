import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IGame} from "../../models/Game";

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
        updateCurrentQuestion(state): void {
            state.currentQuestion = state.currentQuestion! + 1;
            state.chosenAnswer = null;
        },
        updateScore(state): void {
            state.score = state.score + 1
        },
        setChosenAnswer(state, action: PayloadAction<number>): void {
            state.chosenAnswer = action.payload;
        }
    }
});

export const {startGame, updateCurrentQuestion, updateScore, setChosenAnswer} = GameSlice.actions;

export default GameSlice.reducer;


    