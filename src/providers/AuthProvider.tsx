import React, {useEffect, useState} from 'react';
import {setToken} from '../app/services/auth/authSlice';
import AppLoader from '../components/common/AppLoader/AppLoader';
import {getToken} from '../utils/tokenSaver';
import {useDispatch} from 'react-redux';

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({children}: IAuthProviderProps) => {
  const dispatch = useDispatch();

  // State
  // const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState<boolean>(true);

  // const token = useTypesSelector(selectedToken);

  useEffect(() => {
    setTokenLoading(true);
    const fetchToken = async () => {
      const savedToken = await getToken();
      // setToken(savedToken);
      dispatch(setToken(savedToken));
      setTokenLoading(false);
    };

    fetchToken();
  }, [dispatch]);

  // const {isLoading, isFetching, isError, refetch} = useGetUserQuery(undefined, {
  //   skip: !token,
  // });

  // const handleRefetch = useCallback(() => {
  //   if (token) {
  //     refetch();
  //   }
  // }, [refetch, token]);

  if (tokenLoading) { //|| isLoading || isFetching
    return <AppLoader />;
  }

  // if (isError) {
  //   return <AppNetworkErr onRefetch={handleRefetch} />;
  // }

  return <>{children}</>;
};

export default AuthProvider;
