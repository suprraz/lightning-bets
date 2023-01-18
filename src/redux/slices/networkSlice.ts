import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Peer {
  id: string;
}

export interface NetworkState {
  peers: Peer[];
}

const initialState: NetworkState = {
  peers: []
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    updatePeers: (state, action: PayloadAction<Peer[]>) => {
      state.peers = action.payload;
    }
  }
});

export const selectAppPeers = (state: RootState) => state.network.peers;

export const { updatePeers } = networkSlice.actions;

export default networkSlice.reducer;
