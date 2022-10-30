import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getCookie } from '../utils';

const ProtectedUnAuthResetRoute = ({
  children,
  ...rest
}: React.PropsWithChildren<{ [key: string]: any }>) => {
  const isAuth = getCookie('accessToken');
  const wasResetPassword = localStorage.getItem('resetPassword');

  return (
    <Route
      /* eslint-disable-next-line react/jsx-props-no-spreading */
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
