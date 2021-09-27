import { Redirect, Route } from 'react-router-dom'
import { getCookie } from '../utils'

export const ProtectedUnAuthRoute = ({ children, ...rest }: React.PropsWithChildren<{ [key: string]: any }>) => {
  const isAuth = getCookie('accessToken')
  
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
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}