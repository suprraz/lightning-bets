import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface UserState {
  screenName: string;
}

const initialState: UserState = {
  screenName: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setScreenName: (state, action: PayloadAction<string>) => {
      state.screenName = action.payload;
    }
  }
});

export const selectScreenName = (state: RootState) => state.user.screenName;

export const { setScreenName } = userSlice.actions;

export default userSlice.reducer;
