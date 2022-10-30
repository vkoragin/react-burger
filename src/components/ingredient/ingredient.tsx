import React, { FC, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { TIngredient } from '../../types';
import type { ReduxStore } from '../../services/store.types';

import styles from './ingredient.module.css';

interface IIngredientProps {
  ingredient: TIngredient;
}

const Ingredient: FC<IIngredientProps> = ({ ingredient }) => {
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
    const newCount = constructor.filter(
      (item) => item._id === ingredient._id,
    ).length;
    setCount(newCount);
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
};

export default Ingredient;
