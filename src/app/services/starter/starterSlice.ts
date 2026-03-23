import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store.ts';

type InitialState = {
  isSync: boolean;
};

const initialState: InitialState = {
  isSync: false,
};

const starterSlice = createSlice({
  name: 'starter',
  initialState,
  reducers: {
    starterSyncOn: state => {
      state.isSync = true;
    },
    starterSyncOff: state => {
      state.isSync = false;
    },
  },
});

export default starterSlice.reducer;

export const {starterSyncOn, starterSyncOff} = starterSlice.actions;

export const selectedStarterIsSync = (state: RootState): boolean =>
  state.starter.isSync;
