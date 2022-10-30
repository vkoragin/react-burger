import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../utils';

const ProtectedUnAuthRoute = ({
  children,
  ...rest
}: React.PropsWithChildren<{ [key: string]: any }>) => {
  const isAuth = getCookie('accessToken');

  return (
    <Route
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
      render={({ location }) =>
        !isAuth ? (
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

export default ProtectedUnAuthRoute;
