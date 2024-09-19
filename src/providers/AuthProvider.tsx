import React, {useEffect, useState} from 'react';
import {useGetUserQuery} from '../app/services/user/user';
import AppLoader from '../components/common/AppLoader/AppLoader';
import {getToken} from '../utils/tokenSaver';

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

  const {isLoading, isFetching} = useGetUserQuery(token, {
    skip: !token,
  });

  if (tokenLoading || isLoading || isFetching) {
    return <AppLoader />;
  }

  return children;
};

export default React.memo(AuthProvider);
