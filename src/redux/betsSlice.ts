import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface ConditionType {
  label: string;
  url: string;
  validator: string;
  comparison: string;
  value: number;
}

export interface BetType {
  id: string;
  amount: number;
  condition: ConditionType;
}

export interface BetsState {
  activeBets: BetType[];
  status: string;
}

const initialState: BetsState = {
  activeBets: [],
  status: 'idle'
};

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    updateBets: (state, action: PayloadAction<BetType[]>) => {
      const newBets = action.payload.filter(
        (incomingBet) => !state.activeBets.find((activeBet) => activeBet.id === incomingBet.id)
      );
      state.activeBets.push(...newBets);
    }
  }
});

export const selectActiveBets = (state: RootState) => state.bets.activeBets;

export const { updateBets } = betsSlice.actions;

export default betsSlice.reducer;
