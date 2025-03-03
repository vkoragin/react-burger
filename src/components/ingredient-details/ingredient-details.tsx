import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { TIngredient } from '../../types';
import type { ReduxStore } from '../../services/store.types';

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const { ingredients } = useSelector((store: ReduxStore) => store.ingredients);
  const { id } = useParams<{ id: string }>();
  const [ingredient, setIngredient] = useState<TIngredient | null>(null);

  useEffect(() => {
    const targetIngredient = ingredients.filter((item) => item._id === id)[0];
    setIngredient(targetIngredient);
  }, [ingredients, id]);

  return ingredient ? (
    <>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <figure className={styles.ingredient}>
        <p>
          <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
        </p>
        <figcaption className="text text_type_main-medium">{ingredient.name}</figcaption>
      </figure>
      <section className={styles.details}>
        <div className="text_color_inactive">
          <p className="text text_type_main-default mb-3">Калории, ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div className="text_color_inactive">
          <p className="text text_type_main-default mb-3">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div className="text_color_inactive">
          <p className="text text_type_main-default mb-3">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div className="text_color_inactive">
          <p className="text text_type_main-default mb-3">Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </section>
    </>
  ) : (
    <div />
  );
};

export default IngredientDetails;
