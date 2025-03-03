import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import type { ReduxStore } from '../../services/store.types';

import { setActiveTab } from '../../services/actions/burger-ingredients';

import IngredientsGroup from '../ingredients-group/ingredients-group';
import Tabs from '../tabs/tabs';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const { ingredients } = useSelector((store: ReduxStore) => store.ingredients);

  const dispatch = useDispatch();

  const [bun, inViewBun] = useInView({ threshold: 0.3 });
  const [sauce, inViewSauce] = useInView({ threshold: 0.3 });
  const [main, inViewMain] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBun) dispatch(setActiveTab('Булки'));
    else if (inViewSauce) dispatch(setActiveTab('Соусы'));
    else if (inViewMain) dispatch(setActiveTab('Начинки'));
  });

  return (
    <div>
      <Tabs ingredientsTypes={['Булки', 'Соусы', 'Начинки']} />
      <div className={styles.ingredients}>
        <div ref={bun}>
          <IngredientsGroup
            ingredients={ingredients.filter((ingredient) => ingredient.type === 'bun')}
            anchor="bun"
            header="Булки"
          />
        </div>
        <div ref={sauce}>
          <IngredientsGroup
            ingredients={ingredients.filter((ingredient) => ingredient.type === 'sauce')}
            anchor="sauce"
            header="Соусы"
          />
        </div>
        <div ref={main}>
          <IngredientsGroup
            ingredients={ingredients.filter((ingredient) => ingredient.type === 'main')}
            anchor="main"
            header="Начинки"
          />
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
