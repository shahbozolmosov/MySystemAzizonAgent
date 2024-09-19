import {createSlice} from '@reduxjs/toolkit';
import {getUser, IUser} from '../user/user';
import {login} from './auth';
import {RootState} from '../../store';
import {deleteToken, saveToken} from '../../../utils/tokenSaver';

type TAuthState = {
  user: null | IUser;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // TODO logout with local token delete
  },
  extraReducers: builder => {
    builder
      // Get User
      .addMatcher(getUser.matchPending, state => {
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addMatcher(getUser.matchFulfilled, (state, action) => {
        state.isLoading = false;

        if (!action.payload.success) {
          // Delete the token
          deleteToken();

          state.isAuthenticated = false;
          return;
        }

        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addMatcher(getUser.matchRejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      // Login
      .addMatcher(login.matchFulfilled, (state, action) => {
        if (!action.payload.success) {
          state.isLoading = false;
          state.isAuthenticated = false;
          return;
        }

        const userData = action.payload.data;

        state.user = userData;
        state.token = userData.token;
        state.isAuthenticated = true;
        state.isLoading = false;

        // Save token
        saveToken(state.token);
      })
      .addMatcher(login.matchRejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export default slice.reducer;

export const {} = slice.actions;

export const selectedIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;
export const selectedUser = (state: RootState): IUser | null => state.auth.user;
export const selectedIsLoading = (state: RootState): boolean =>
  state.auth.isLoading;
