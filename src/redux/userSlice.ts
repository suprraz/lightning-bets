import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { readAppData, saveAppData } from '../messaging/persistentDataStore';

export interface UserState {
  status: string;
  screenName: string;
}

const initialState: UserState = {
  status: 'idle',
  screenName: ''
};

export const saveScreenName = createAsyncThunk(
  'user/saveScreenName',
  async (screenName: string) => {
    return await saveAppData('screenName', screenName);
  }
);

export const loadScreenName = createAsyncThunk('user/loadScreenName', async () => {
  return await readAppData('screenName');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(saveScreenName.pending, (state, action) => {
      state.screenName = action.meta.arg;
      state.status = 'loading';
    });
    builder.addCase(saveScreenName.fulfilled, (state) => {
      state.status = 'idle';
    });

    builder.addCase(loadScreenName.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loadScreenName.fulfilled, (state, action) => {
      state.screenName = action.payload as string;
      state.status = 'idle';
    });
  }
});

export const selectScreenName = (state: RootState) => state.user.screenName;

// export const {} = userSlice.actions;

export default userSlice.reducer;
