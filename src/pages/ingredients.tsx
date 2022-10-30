import React, { FC } from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './ingredients.module.css';

const IngredientsPage: FC = () => {
  return (
    <div className={styles.ingredients}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientsPage;
