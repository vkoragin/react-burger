import { useState, useEffect }  from 'react'
import { ingredient } from '../../types.js'
import { useLocation, Link } from 'react-router-dom'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setIngredient } from '../../services/actions/ingredient.js'
import { useDrag } from 'react-dnd'

export default function Ingredient (props) {
  const ingredient = props.ingredient
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const { constructor } = useSelector(store => store.ingredients)
  const location = useLocation()
  const ingredientId = ingredient['_id']

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  })

  useEffect(() => {
    const count = constructor.filter(item => item['_id'] === ingredient['_id']).length
    setCount(count)
  }, [constructor, ingredient])

  const onOpen = () => {
    dispatch(setIngredient(ingredient))
  }

  return (
    <Link
      key={ingredientId}
      to={{        
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <figure className={styles.ingredient} onClick={onOpen} ref={dragRef}>
        {count > 0 && <Counter count={ingredient.type === 'bun' ? count + 1 : count} size="default"/>}
        <p><img src={ingredient.image} alt={ingredient.name}/></p>
        <p className={ styles.price }>
          <span className='text text_type_digits-default pr-2'>
            {ingredient.price}
          </span>
          <CurrencyIcon/>
        </p>            
        <figcaption className='text text_type_main-default'>{ingredient.name}</figcaption>
      </figure>
    </Link>    
  )
}

Ingredient.propTypes = {
  ingredient: ingredient.isRequired
}
