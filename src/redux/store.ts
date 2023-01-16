import { configureStore } from '@reduxjs/toolkit';
import routeSliceReducer from './routeSlice';
import userSliceReducer from './userSlice';
import networkSliceReducer from './networkSlice';
import betsSliceReducer from './betsSlice';

export const store = configureStore({
  reducer: {
    route: routeSliceReducer,
    user: userSliceReducer,
    network: networkSliceReducer,
    bets: betsSliceReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
