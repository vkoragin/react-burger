import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux'

export default function IngredientDetails () {
    const { ingredient } = useSelector(store => store.ingredient)

    return (
        ingredient &&
        <> 
            <figure className={styles.ingredient}>
                <p><img className={styles.image} src={ingredient['image_large']} alt={ingredient.name}/></p>    
                <figcaption className='text text_type_main-medium'>{ingredient.name}</figcaption>
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
    )
}
