import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    logout: state => {
      Object.assign(state, initialState);

      // Delete the token
      deleteToken();
    },
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

        if (!action.payload.success || action.payload.data.rol !== 'agent') {
          // Delete the token
          deleteToken();

          state.isAuthenticated = false;
          return;
        }

        const userData = action.payload.data;

        state.user = userData;
        state.token = userData.token;
        state.isAuthenticated = true;
      })
      .addMatcher(getUser.matchRejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      // Login
      .addMatcher(login.matchFulfilled, (state, action) => {
        if (!action.payload.success || action.payload.data.rol !== 'agent') {
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
        if (state.token) {
          saveToken(state.token);
        }
      })
      .addMatcher(login.matchRejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export default slice.reducer;

export const {setToken, logout} = slice.actions;

export const selectedIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;
export const selectedUser = (state: RootState): IUser | null => state.auth.user;
export const selectedToken = (state: RootState): IUser | null =>
  state.auth.token;
export const selectedIsLoading = (state: RootState): boolean =>
  state.auth.isLoading;
