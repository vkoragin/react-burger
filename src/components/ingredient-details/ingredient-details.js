import { useState, useEffect }  from 'react'
import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function IngredientDetails () {
    const location = useLocation()
    const { ingredients } = useSelector(store => store.ingredients)
    const path = location.pathname.split('/')
    const id = path[path.length-1]
    const [ingredient, setIngredient] = useState(null)    
    
    useEffect(() => {        
        const targetIngredient = ingredients.filter(item => item['_id'] === id)[0]
        setIngredient(targetIngredient)
      }, [ingredients, id])

    return (
        ingredient 
        ?
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
        :   <></>  
    )
}
