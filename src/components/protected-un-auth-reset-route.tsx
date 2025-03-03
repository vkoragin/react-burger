import { PropsWithChildren } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getCookie } from '../utils';

const ProtectedUnAuthResetRoute = ({
  children,
  ...rest
}: PropsWithChildren<{ [key: string]: any }>) => {
  const isAuth = getCookie('accessToken');
  const wasResetPassword = localStorage.getItem('resetPassword');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth && wasResetPassword === 'true' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedUnAuthResetRoute;
