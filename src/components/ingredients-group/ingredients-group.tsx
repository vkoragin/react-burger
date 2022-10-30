import React, { FC } from 'react';

import type { TIngredient } from '../../types';

import Ingredient from '../ingredient/ingredient';

import styles from './ingredients-group.module.css';

interface IIngredientsGroupProps {
  ingredients: TIngredient[];
  anchor: string;
  header: string;
}

const IngredientsGroup: FC<IIngredientsGroupProps> = ({
  ingredients,
  anchor,
  header,
}) => {
  return (
    <section className={styles.group}>
      <header className={`text text_type_main-medium ${anchor}`}>
        {header}
      </header>
      <section className={styles.ingredients}>
        {ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </section>
    </section>
  );
};

export default IngredientsGroup;
