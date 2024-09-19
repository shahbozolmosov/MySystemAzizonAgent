import React from 'react';
import {useGetUserQuery} from '../app/services/user/user';

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({children}: IAuthProviderProps) => {
  useGetUserQuery();

  return children;
};

export default React.memo(AuthProvider);
