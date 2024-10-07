import React, {useCallback, useEffect, useState} from 'react';
import {selectedToken, setToken} from '../app/services/auth/authSlice';
import AppLoader from '../components/common/AppLoader/AppLoader';
import {getToken} from '../utils/tokenSaver';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {useGetUserQuery} from '../app/services/user/user.ts';
import {useTypesSelector} from '../app/store.ts';
import AppNetworkErr from '../components/common/AppNetworkErr/AppNetworkErr.tsx';

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({children}: IAuthProviderProps) => {
  const dispatch = useDispatch();

  // State
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [tokenLoading, setTokenLoading] = useState<boolean>(true);

  const token = useTypesSelector(selectedToken);

  useEffect(() => {
    // Tarmoq holatini tekshirish
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Unsubscribe qilish
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setTokenLoading(true);
    const fetchToken = async () => {
      const savedToken = await getToken();
      dispatch(setToken(savedToken));
      setTokenLoading(false);
    };

    fetchToken();
  }, [dispatch]);

  const {isLoading, isFetching, isError, refetch} = useGetUserQuery(undefined, {
    skip: !token || (token && !isConnected),
  });

  const handleRefetch = useCallback(() => {
    if (token) {
      refetch();
    }
  }, [refetch, token]);

  if (tokenLoading || isLoading || isFetching) {
    return <AppLoader />;
  }

  if (isError && isConnected) {
    return <AppNetworkErr onRefetch={handleRefetch} />;
  }

  return <>{children}</>;
};

export default AuthProvider;
