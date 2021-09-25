import Ingredient from '../ingredient/ingredient'
import styles from './ingredients-group.module.css'
import type { TIngredient } from '../../types'

export default function IngredientsGroup (props: { ingredients: TIngredient[], anchor: string, header: string }) {
  return (
    <section className={ styles.group }>
      <header className={'text text_type_main-medium ' + props.anchor}>
          {props.header}
      </header>
      <section className={ styles.ingredients }>            
        {props.ingredients.map(ingredient => <Ingredient key={ingredient['_id']} ingredient={ingredient}/>)}
      </section>
    </section>   
  )
}
