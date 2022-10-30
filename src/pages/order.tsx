import React, { FC } from 'react';
import Order from '../components/order/order';
import styles from './order.module.css';

const OrderPage: FC = () => {
  return (
    <div className={styles.orderPage}>
      <Order />
    </div>
  );
};

export default OrderPage;
