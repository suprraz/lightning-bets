import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface RouteState {
  activePath: string;
}

const initialState: RouteState = {
  activePath: ''
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setActivePath: (state, action: PayloadAction<string>) => {
      state.activePath = action.payload;
    }
  }
});

export const selectActivePath = (state: RootState) => state.route.activePath;

export const { setActivePath } = routeSlice.actions;

export default routeSlice.reducer;
