import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { minPasswordLength, emailRegExp } from '../utils';

import { registerUser } from '../services/actions/auth';

const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState<
    'password' | 'email' | 'text' | undefined
  >('password');
  const [errorPassword, setPasswordError] = useState(false);
  const [errorPasswordText, setPasswordText] = useState('');
  const [name, setName] = useState('');
  const [errorName, setNameError] = useState(false);
  const errorNameText = 'Это поле не должно быть пустым';
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChangeEmail = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.target.value);
  };

  const handleToggleText = () => {
    setPasswordType(
      passwordType === 'password' ? 'text' : 'password',
    );
  };

  const validateName = () => {
    const isValid = Boolean(name.length);
    setNameError(!isValid);
    return isValid;
  };

  const clearErrors = () => {
    setPasswordError(false);
    setErrorEmail(false);
    setNameError(false);
  };

  const validatePassword = () => {
    const isValid = Boolean(
      password.length && password.length >= minPasswordLength,
    );
    if (password.length && password.length < minPasswordLength)
      setPasswordText(
        `Пароль должен быть не менее ${minPasswordLength} символов`,
      );
    if (!password.length)
      setPasswordText('Это поле не должно быть пустым');
    setPasswordError(!isValid);
    return isValid;
  };

  const validateEmail = () => {
    const validEmail = emailRegExp.test(String(email).toLowerCase());
    const isValid = Boolean(email.length && validEmail);
    if (email.length && !validEmail)
      setErrorEmailText('Не валидный email');
    if (!email.length)
      setErrorEmailText('Это поле не должно быть пустым');
    setErrorEmail(!isValid);
    return isValid;
  };

  const validate = () => {
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmail();
    const isNameValid = validateName();
    return isPasswordValid && isEmailValid && isNameValid;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    const isValid = validate();
    if (isValid) {
      const data = {
        email,
        password,
        name,
      };
      dispatch(registerUser(data) as any).then(() =>
        history.replace({ pathname: '/' }),
      );
    }
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleChangeName}
          value={name}
          name="name"
          error={errorName}
          errorText={errorNameText}
        />
      </div>
      <div className="mb-6">
        <Input
          onChange={handleChangeEmail}
          value={email}
          name="email"
          error={errorEmail}
          errorText={errorEmailText}
          placeholder="Укажите email"
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
          placeholder="Введите новый пароль"
        />
      </div>
      <p className="mb-20">
        <Button type="primary" size="medium" htmlType="button">
          Зарегистрироваться
        </Button>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
};

export default RegisterPage;
