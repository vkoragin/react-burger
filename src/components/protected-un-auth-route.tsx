import { PropsWithChildren } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getCookie } from '../utils';

const ProtectedUnAuthRoute = ({ children, ...rest }: PropsWithChildren<{ [key: string]: any }>) => {
  const isAuth = getCookie('accessToken');

  return (
    <Route
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
