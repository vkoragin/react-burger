import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import styles from './ingredient.module.css';
import type { ReduxStore } from '../../services/store.types';
import type { TIngredient } from '../../types';

export default function Ingredient(props: {
  ingredient: TIngredient;
}) {
  const { ingredient } = props;
  const [count, setCount] = useState(0);
  const { constructor } = useSelector(
    (store: ReduxStore) => store.ingredients,
  );
  const location = useLocation();
  const ingredientId = ingredient._id;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  useEffect(() => {
    const count = constructor.filter(
      (item) => item._id === ingredient._id,
    ).length;
    setCount(count);
  }, [constructor, ingredient]);

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <figure className={styles.ingredient} ref={dragRef}>
        {count > 0 && (
          <Counter
            count={ingredient.type === 'bun' ? count + 1 : count}
            size="default"
          />
        )}
        <p>
          <img src={ingredient.image} alt={ingredient.name} />
        </p>
        <p className={styles.price}>
          <span className="text text_type_digits-default pr-2">
            {ingredient.price}
          </span>
          <CurrencyIcon type="primary" />
        </p>
        <figcaption className="text text_type_main-default">
          {ingredient.name}
        </figcaption>
      </figure>
    </Link>
  );
}
