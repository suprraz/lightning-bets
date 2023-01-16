import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

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
    addPeers: (state, action: PayloadAction<Peer[]>) => {
      state.peers.push(...action.payload);
    },
    removePeers: (state, action: PayloadAction<Peer[]>) => {
      const peersToDelete = action.payload;
      state.peers = state.peers.filter(
        (peer) => !peersToDelete.find((dPeer) => dPeer.id === peer.id)
      );
    }
  }
});

export const selectAppPeers = (state: RootState) => state.network.peers;

export const { addPeers, removePeers } = networkSlice.actions;

export default networkSlice.reducer;
