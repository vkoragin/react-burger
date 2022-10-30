import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { formatDate } from '../../utils';
import type { TIngredient } from '../../types';
import type { ReduxStore } from '../../services/store.types';

import getOrder from '../../services/actions/order';

import styles from './order.module.css';

const Order: FC = () => {
  const { order, orderRequest, orderFailed } = useSelector(
    (store: ReduxStore) => store.order,
  );
  const { ingredients } = useSelector(
    (store: ReduxStore) => store.ingredients,
  );
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [orderIngredients, setOrderIngredients] = useState<
    TIngredient[] | null
  >(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (ingredients.length) {
      let totalPrice = 0;
      let bun = 0;
      order?.ingredients?.forEach((ingredient) => {
        const targetIngredient = ingredients.filter(
          (item) => item._id === ingredient,
        )[0];
        if (targetIngredient.type === 'bun' && !bun) {
          totalPrice += 2 * targetIngredient.price;
          bun = 1;
        }
        if (targetIngredient.type !== 'bun')
          totalPrice += targetIngredient.price;
      });
      setPrice(totalPrice);

      const orderIngredientsSet = new Set();
      const turgetOrderIngredients: TIngredient[] = [];
      order?.ingredients?.forEach((item) =>
        orderIngredientsSet.add(item),
      );
      orderIngredientsSet.forEach((value) =>
        turgetOrderIngredients.push(
          ingredients.filter(
            (ingredient) => ingredient._id === value,
          )[0],
        ),
      );
      turgetOrderIngredients.forEach((turgetOrderIngredient) => {
        if (turgetOrderIngredient.type === 'bun') {
          turgetOrderIngredient.count = 2;
        } else {
          turgetOrderIngredient.count = order?.ingredients.filter(
            (ingredient) => ingredient === turgetOrderIngredient._id,
          ).length;
        }
      });
      setOrderIngredients(turgetOrderIngredients);
    }
  }, [ingredients, order]);

  const getStatus = (status: string) => {
    if (status === 'done') return 'Выполнен';
    if (status === 'created') return 'Создан';
    if (status === 'pending') return 'Готовится';
    return false;
  };

  const getStatusColor = (status: string) =>
    status === 'done' ? '#00CCCC' : '#FFFFFF';

  if (orderFailed)
    return (
      <p className="text text_type_main-default text_color_inactive">
        Произошла ошибка при получении данных о заказе
      </p>
    );
  if (orderRequest)
    return (
      <p className="text text_type_main-default text_color_inactive">
        Загрузка заказа...
      </p>
    );

  return (
    order && (
      <section className={styles.orderInfo}>
        <header className="text text_type_digits-default pt-4">
          {`#${order.number}`}
        </header>
        <p className="text text_type_main-medium pt-10">
          {order.name}
        </p>
        <p className="text text_type_main-default pt-2">
          <span style={{ color: getStatusColor(order.status) }}>
            {getStatus(order.status)}
          </span>
        </p>
        <p className="text text_type_main-medium pt-15 pb-4">
          Состав:
        </p>
        <div className={`${styles.orderWrapper} pr-2`}>
          {Boolean(orderIngredients) &&
            orderIngredients?.map((ingredient, i) => {
              return (
                // eslint-disable-next-line
                <div key={i} className={`${styles.order} mt-4 pb-2`}>
                  <div className={styles.info}>
                    <div className={`${styles.imageWrapper} mr-4`}>
                      <img
                        className={styles.image}
                        src={ingredient.image_mobile}
                        alt=""
                      />
                    </div>
                    <div
                      className={`${styles.name} text text_type_main-default`}
                    >
                      {ingredient.name}
                    </div>
                  </div>

                  <div
                    className={`${styles.price} text text_type_digits-default`}
                  >
                    <span className="pr-2">
                      {ingredient.count &&
                        ingredient.count > 1 &&
                        `${ingredient.count} x `}
                      {ingredient.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })}
        </div>
        <footer className={`${styles.footer} mt-10 pr-2`}>
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(order.createdAt)}
          </p>
          <div
            className={`${styles.price} text text_type_digits-default`}
          >
            <span className="pr-2">{price}</span>
            <CurrencyIcon type="primary" />
          </div>
        </footer>
      </section>
    )
  );
};

export default Order;
