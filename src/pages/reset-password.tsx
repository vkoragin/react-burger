import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/actions/reset-password';
import { minPasswordLength } from '../utils';

const ResetPasswordPage: FC = () => {
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState<
    'password' | 'email' | 'text' | undefined
  >('password');
  const [errorPassword, setPasswordError] = useState(false);
  const [errorPasswordText, setPasswordText] = useState('');
  const [token, setToken] = useState('');
  const [errorToken, setTokenError] = useState(false);
  const errorTokenText = 'Это поле не должно быть пустым';
  const dispatch = useDispatch();
  const history = useHistory();

  const changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleText = () => {
    setPasswordType(
      passwordType === 'password' ? 'text' : 'password',
    );
  };

  const clearErrors = () => {
    setPasswordError(false);
    setTokenError(false);
  };

  const validatePassword = () => {
    const isValid = Boolean(
      password.length && password.length >= minPasswordLength,
    );
    if (password.length && password.length < minPasswordLength)
      setPasswordText('Пароль должен быть не менее шести символов');
    if (!password.length)
      setPasswordText('Это поле не должно быть пустым');
    setPasswordError(!isValid);
    return isValid;
  };

  const validateToken = () => {
    const isValid = Boolean(token.length);
    setTokenError(!isValid);
    return isValid;
  };

  const validate = () => {
    const isPasswordValid = validatePassword();
    const isTokenValid = validateToken();
    return isPasswordValid && isTokenValid;
  };

  const submit = (e: any) => {
    e.preventDefault();
    clearErrors();
    const isValid = validate();
    if (isValid) {
      const data = {
        password,
        token,
      };
      dispatch(resetPassword(data) as any).then(() =>
        history.replace({ pathname: '/login' }),
      );
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <p className="text text_type_main-medium mb-6">
        Восстановление пароля
      </p>
      <div className="mb-6">
        <Input
          onChange={changePassword}
          type={passwordType}
          value={password}
          name="password"
          icon={passwordType === 'password' ? 'ShowIcon' : 'HideIcon'}
          error={errorPassword}
          errorText={errorPasswordText}
          onIconClick={toggleText}
          placeholder="Введите новый пароль"
        />
      </div>
      <div className="mb-6">
        <Input
          onChange={changeCode}
          type="text"
          value={token}
          name="token"
          error={errorToken}
          errorText={errorTokenText}
          placeholder="Ведите код из письма"
        />
      </div>
      <p className="mb-20">
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
};

export default ResetPasswordPage;
