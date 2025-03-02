import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { emailRegExp } from '../utils';

import { resetPassword } from '../services/actions/forgot-password';

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeEmail = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEmail(false);
    const isValid = validateEmail();
    if (isValid) {
      dispatch(resetPassword(email) as any).then(() =>
        history.replace({ pathname: '/reset-password' }),
      );
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="text text_type_main-medium mb-6">
        Восстановление пароля
      </p>
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
      <p className="mb-20">
        <Button type="primary" size="medium" htmlType="button">
          Восстановить
        </Button>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль ? <Link to="/login"> Войти </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordPage;
