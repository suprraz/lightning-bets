import { configureStore } from '@reduxjs/toolkit';
import routeSliceReducer from './slices/routeSlice';
import userSliceReducer from './slices/userSlice';
import networkSliceReducer from './slices/networkSlice';
import betsSliceReducer from './slices/betsSlice';
import addNetworkListeners from './listeners/addNetworkListeners';

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

addNetworkListeners(store.dispatch, store.getState);
