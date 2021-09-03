import { Redirect, Route } from 'react-router-dom'
import { getCookie } from '../utils'

export function ProtectedRoute({ children, ...rest }) {
  const isAuth = getCookie('accessToken')
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}