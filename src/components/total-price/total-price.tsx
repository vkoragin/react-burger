import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import styles from './total-price.module.css';
import { getCookie } from '../../utils';
import getOrderNumber from '../../services/actions/order-details';
import type { ReduxStore } from '../../services/store.types';

const TotalPrice: FC = () => {
  const [visible, setVisible] = useState(false);
  const { constructor } = useSelector(
    (store: ReduxStore) => store.ingredients,
  );
  const [price, setPrice] = useState(0);
  const history = useHistory();
  const isAuth = getCookie('accessToken');
  const dispatch = useDispatch();

  const onClose = () => setVisible(false);

  const createOrder = () => {
    const ingredientsIds = constructor.map(
      (ingredient) => ingredient._id,
    );
    dispatch(getOrderNumber(ingredientsIds));
  };

  const onOpen = () => {
    if (isAuth) {
      setVisible(true);
      createOrder();
    } else {
      history.replace({ pathname: '/login' });
    }
  };

  const showButton = () => {
    return Boolean(
      constructor.length &&
        constructor.filter((item) => item.type === 'bun').length,
    );
  };

  useEffect(() => {
    const totalPrice = constructor.reduce(
      (sum, current) =>
        current.type === 'bun'
          ? sum + current.price * 2
          : sum + current.price,
      0,
    );
    setPrice(totalPrice);
  }, [constructor]);

  return (
    <>
      <div className={styles.totalPrice}>
        <span className="text text_type_digits-default pr-2">
          {price}
        </span>
        <CurrencyIcon type="primary" />
        <p className="ml-10">
          {showButton() && (
            <Button onClick={onOpen} type="primary" size="medium">
              Оформить заказ
            </Button>
          )}
        </p>
      </div>
      {visible && (
        <Modal onCloseByClick={onClose} onCloseByKeyDown={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default TotalPrice;
