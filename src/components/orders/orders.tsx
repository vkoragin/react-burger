import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { feedsUserUrl } from '../../url';

import type { ReduxStore } from '../../services/store.types';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/wsActionTypes';
import type { TOrder } from '../../types';
import FeedItem from '../feed-item/feed-item';
import { getCookie } from '../../utils';

import styles from './orders.module.css';

const Orders: FC = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store: ReduxStore) => store.messages);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const accessToken = getCookie('accessToken')?.split(' ');
  let token = '';
  if (accessToken) [token] = accessToken;

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: feedsUserUrl + token,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch, token]);

  useEffect(() => {
    if (messages[0]?.orders) {
      setOrders(messages[0].orders);
    }
  }, [messages]);

  return (
    <div className={styles.userFeed}>
      {!!orders.length ? (
        orders.map((item) =>
          item?.ingredients?.length ? <FeedItem key={item._id} order={item} showStatus /> : false,
        )
      ) : (
        <p className="text text_type_main-default text_color_inactive pt-4">
          У Вас еще не было заказов
        </p>
      )}
    </div>
  );
};

export default Orders;
