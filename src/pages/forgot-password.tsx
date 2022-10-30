import React, { FC, useState } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/actions/forgot-password';

import { emailRegExp } from '../utils';

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const changeEmail = (e: any) => {
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

  const submit = (e: any) => {
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
    <form className="form" onSubmit={submit}>
      <p className="text text_type_main-medium mb-6">
        Восстановление пароля
      </p>
      <div className="mb-6">
        <Input
          onChange={changeEmail}
          value={email}
          name="email"
          error={errorEmail}
          errorText={errorEmailText}
          placeholder="Укажите email"
        />
      </div>
      <p className="mb-20">
        <Button type="primary" size="medium">
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