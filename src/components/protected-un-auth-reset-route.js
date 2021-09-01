import { Redirect, Route } from 'react-router-dom'
import { getCookie } from '../utils'

export function ProtectedUnAuthResetRoute({ children, ...rest }) {
  const isAuth = getCookie('accessToken')
  const wasResetPassord = localStorage.getItem('resetPassword')
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth && wasResetPassord === 'true' ? (
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