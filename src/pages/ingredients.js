import IngredientDetails from '../components/ingredient-details/ingredient-details'
import styles from './ingredients.module.css'

export function IngredientsPage() {
    return (
        <div className={styles.ingredients}>
            <IngredientDetails/>
        </div>
    )
}