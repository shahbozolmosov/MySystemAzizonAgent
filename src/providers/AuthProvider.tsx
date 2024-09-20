import React, {useCallback, useEffect, useState} from 'react';
import {useGetUserQuery} from '../app/services/user/user';
import AppLoader from '../components/common/AppLoader/AppLoader';
import {getToken} from '../utils/tokenSaver';
import AppNetworkErr from '../components/common/AppNetworkErr/AppNetworkErr';

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({children}: IAuthProviderProps) => {
  // State
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState<boolean>(true);

  useEffect(() => {
    setTokenLoading(true);
    const fetchToken = async () => {
      const savedToken = await getToken();
      setToken(savedToken);
      setTokenLoading(false);
    };

    fetchToken();
  }, []);

  const {isLoading, isFetching, isError, refetch} = useGetUserQuery(token, {
    skip: !token,
  });

  const handleRefetch = useCallback(() => {
    if (token) {
      refetch();
    }
  }, [refetch, token]);

  if (tokenLoading || isLoading || isFetching) {
    return <AppLoader />;
  }

  if (isError) {
    return <AppNetworkErr onRefetch={handleRefetch} />;
  }

  return children;
};

export default React.memo(AuthProvider);
