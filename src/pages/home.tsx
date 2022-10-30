import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import type { ReduxStore } from '../services/store.types';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

import styles from './home.module.css';

const HomePage: FC = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store: ReduxStore) => store.ingredients,
  );

  if (ingredientsFailed)
    return (
      <p className="text text_type_main-default text_color_inactive">
        Произошла ошибка при получении данных
      </p>
    );
  if (ingredientsRequest)
    return (
      <p className="text text_type_main-default text_color_inactive">
        Загрузка данных...
      </p>
    );

  return (
    <>
      <header className={styles.header}>
        <h1 className="text text_type_main-large pt-8 pb-6">
          Соберите бургер
        </h1>
      </header>
      <section className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </>
  );
};

export default HomePage;
