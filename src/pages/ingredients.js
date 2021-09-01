import IngredientDetails from '../components/ingredient-details/ingredient-details'
import styles from './ingredients.module.css'

export function IngredientsPage() {
    return (
        <div className={styles.ingredients}>
            <p className="text text_type_main-large pt-20">Детали ингредиента</p>
            <IngredientDetails/>
        </div>
    )
}