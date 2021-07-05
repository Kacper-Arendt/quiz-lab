import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import appReducer from './appSlice';
import userReducer from './user/userSlice';
import gameReducer from './game/gameSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
        game: gameReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
