import styles from './app.module.css'
import AppHeader from '../app-header/app-header.js'
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom'
import { LoginPage, RegisterPage, HomePage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientsPage, NotFound404 } from '../../pages'
import { ProtectedRoute } from '../protected-route'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import Loader from '../loader/loader'
import Modal from '../modal/modal.js'
import IngredientDetails from '../ingredient-details/ingredient-details.js'
import { setIngredient } from '../../services/actions/ingredient.js'

export default function App() {
  const ModalSwitch = () => {
    const { loader } = useSelector((store: RootStateOrAny) => store.loader)
    const dispatch = useDispatch()
    const location = useLocation<any>()
    const history = useHistory<any>()
    const background =
      (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background
    
    const onClose = (e: any) => {
      if(e) e.stopPropagation()
      dispatch(setIngredient())
      history.goBack()
    }

    return (
      <div className="App">
          <AppHeader/>
          <main className={ styles.main }>        
              <Switch location={background || location}>
                <Route path={`/`} exact>
                  <HomePage />
                </Route>
                <Route path={`/login`} exact>
                  <LoginPage />
                </Route>
                <Route path={`/register`} exact>
                  <RegisterPage />
                </Route>
                <Route path={`/forgot-password`} exact>
                  <ForgotPasswordPage />
                </Route>
                <Route path={`/reset-password`} exact>
                  <ResetPasswordPage />
                </Route>
                <ProtectedRoute path={`/profile`}>                         
                  <ProfilePage />
                </ProtectedRoute>                
                <Route path={`/ingredients/:id`} exact>
                  <IngredientsPage />
                </Route>
                <Route>
                  <NotFound404 />
                </Route>
              </Switch>

              {background && (
                <Route
                  path='/ingredients/:ingredientId'
                  children={
                    <Modal onClose={onClose} header={'Детали ингредиента'}>
                      <IngredientDetails/>
                    </Modal>
                  }
                />
              )}
          </main>
        {
          loader && <Loader text={'Загрузка...'} />        
        }
      </div>
    )
  }

  return (
    <Router>
      <ModalSwitch />
    </Router>
  )
}
