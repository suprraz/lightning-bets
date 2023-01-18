import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
  status: 'open' | 'locked' | 'funded';
  condition: ConditionType;
  updated: number;
}

export interface BetsState {
  bets: BetType[];
  status: 'idle';
}

const initialState: BetsState = {
  bets: [],
  status: 'idle'
};

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    updateBets: (state, action: PayloadAction<BetType[]>) => {
      const modifiedBets = action.payload.filter((bet) => {
        return (
          !state.bets.find((localBet) => localBet.id === bet.id) ||
          state.bets.find((localBet) => localBet.id === bet.id && localBet.updated !== bet.updated)
        );
      });

      if (modifiedBets.length) {
        state.bets = [
          ...new Map([...state.bets, ...action.payload].map((bet) => [bet.id, bet])).values()
        ];
        state.bets = state.bets.sort((a, b) => a.updated - b.updated);
      }
    },
    takeBet: (state, action: PayloadAction<string>) => {
      state.bets = state.bets.map((bet) =>
        bet.id === action.payload
          ? {
              ...bet,
              status: 'locked',
              updated: Date.now()
            }
          : bet
      );

      state.bets = state.bets.sort((a, b) => a.updated - b.updated);
    }
  }
});

export const selectBetlist = (state: RootState) => state.bets.bets;

export const { updateBets, takeBet } = betsSlice.actions;

export default betsSlice.reducer;
