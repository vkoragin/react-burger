import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

import type { ReduxStore } from '../../services/store.types';

import { getIngredients } from '../../services/actions/burger-ingredients';
import { useDispatch, useSelector } from '../../services/hooks';

import ProtectedRoute from '../protected-route';
import ProtectedUnAuthRoute from '../protected-un-auth-route';
import ProtectedUnAuthResetRoute from '../protected-un-auth-reset-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import AppHeader from '../app-header/app-header';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import Order from '../order/order';

import {
  LoginPage,
  RegisterPage,
  HomePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  FeedPage,
  IngredientsPage,
  NotFound404,
  OrderPage,
} from '../../pages';

import styles from './app.module.css';

const ModalSwitch = () => {
  const { loader } = useSelector((store: ReduxStore) => store.loader);
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const history = useHistory<History>();
  const background =
    (history.action === 'PUSH' || history.action === 'REPLACE') &&
    location.state &&
    location.state.background;

  const handleClose = (e?: React.MouseEvent | KeyboardEvent) => {
    if (e) e.stopPropagation();
    history.goBack();
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <Switch location={background || location}>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <ProtectedUnAuthRoute path="/login" exact>
            <LoginPage />
          </ProtectedUnAuthRoute>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <ProtectedUnAuthRoute path="/forgot-password" exact>
            <ForgotPasswordPage />
          </ProtectedUnAuthRoute>
          <ProtectedUnAuthResetRoute path="/reset-password" exact>
            <ResetPasswordPage />
          </ProtectedUnAuthResetRoute>
          <Route path="/feed" exact>
            <FeedPage />
          </Route>
          <Route path="/feed/:id" exact>
            <OrderPage />
          </Route>
          <ProtectedRoute path="/profile/orders/:id" exact>
            <OrderPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact>
            <IngredientsPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
          <Route path="/ingredients/:id">
            <Modal
              onCloseByClick={handleClose}
              onCloseByKeyDown={handleClose}
            >
              <IngredientDetails />
            </Modal>
          </Route>
        )}

        {background && (
          <Route path="/feed/:id">
            <Modal
              onCloseByClick={handleClose}
              onCloseByKeyDown={handleClose}
            >
              <Order />
            </Modal>
          </Route>
        )}

        {background && (
          <Route path="/profile/orders/:id">
            <Modal
              onCloseByClick={handleClose}
              onCloseByKeyDown={handleClose}
            >
              <Order />
            </Modal>
          </Route>
        )}
      </main>
      {loader && <Loader text="Загрузка..." />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
};
export default App;
