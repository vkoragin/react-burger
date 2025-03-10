import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { minPasswordLength, emailRegExp } from '../utils';

import { loginUser } from '../services/actions/auth';

const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState<'password' | 'email' | 'text' | undefined>(
    'password',
  );
  const [errorPassword, setPasswordError] = useState(false);
  const [errorPasswordText, setPasswordText] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleToggleText = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const clearErrors = () => {
    setPasswordError(false);
    setErrorEmail(false);
  };

  const validatePassword = () => {
    const isValid = Boolean(password.length && password.length >= minPasswordLength);
    if (password.length && password.length < minPasswordLength)
      setPasswordText(`Пароль должен быть не менее ${minPasswordLength} символов`);
    if (!password.length) setPasswordText('Это поле не должно быть пустым');
    setPasswordError(!isValid);
    return isValid;
  };

  const validateEmail = () => {
    const validEmail = emailRegExp.test(String(email).toLowerCase());
    const isValid = Boolean(email.length && validEmail);
    if (email.length && !validEmail) setErrorEmailText('Не валидный email');
    if (!email.length) setErrorEmailText('Это поле не должно быть пустым');
    setErrorEmail(!isValid);
    return isValid;
  };

  const validate = () => {
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmail();
    return isPasswordValid && isEmailValid;
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    const isValid = validate();
    if (isValid) {
      const data = {
        email,
        password,
      };
      dispatch(loginUser(data) as any).then(() => {
        const pathName = location?.state?.from?.pathname;
        history.replace({ pathname: pathName });
      });
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <div className="mb-6">
        <Input
          onChange={handleChangeEmail}
          value={email}
          name="email"
          error={errorEmail}
          errorText={errorEmailText}
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <Input
          onChange={handleChangePassword}
          type={passwordType}
          value={password}
          name="password"
          icon={passwordType === 'password' ? 'ShowIcon' : 'HideIcon'}
          error={errorPassword}
          errorText={errorPasswordText}
          onIconClick={handleToggleText}
          placeholder="Пароль"
        />
      </div>
      <p className="mb-20">
        <Button type="primary" size="medium" htmlType="submit">
          Войти
        </Button>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </form>
  );
};

export default LoginPage;
