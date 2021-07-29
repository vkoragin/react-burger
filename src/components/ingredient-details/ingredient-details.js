import { ingredient } from '../../types.js'
import styles from './ingredient-details.module.css'

export default function IngredientDetails (props) {
    return (
        <>
            <figure className={styles.ingredient}>
                <p><img className={styles.image} src={props.ingredient['image_large']} alt={props.ingredient.name}/></p>    
                <figcaption className='text text_type_main-medium'>{props.ingredient.name}</figcaption>
            </figure>
            <section className={styles.details}>
                <div className="text_color_inactive">
                    <p className="text text_type_main-default mb-3">Калории, ккал</p>
                    <p className="text text_type_digits-default">{props.ingredient.calories}</p>
                </div>
                <div className="text_color_inactive">
                    <p className="text text_type_main-default mb-3">Белки, г</p>
                    <p className="text text_type_digits-default">{props.ingredient.proteins}</p>
                </div>
                <div className="text_color_inactive">
                    <p className="text text_type_main-default mb-3">Жиры, г</p>
                    <p className="text text_type_digits-default">{props.ingredient.fat}</p>
                </div>
                <div className="text_color_inactive">
                    <p className="text text_type_main-default mb-3">Углеводы, г</p>
                    <p className="text text_type_digits-default">{props.ingredient.carbohydrates}</p>
                </div>
            </section>
        </>     
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredient.isRequired
  }