import { useState, useEffect }  from 'react'
import { ingredient } from '../../types.js'
import Modal from '../modal/modal.js'
import IngredientDetails from '../ingredient-details/ingredient-details.js'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setIngredient } from '../../services/actions/ingredient.js'
import { ADD_TO_CONSTRUCTOR } from '../../services/actions/actionTypes.js'
import { useDrag } from 'react-dnd'

export default function Ingredient (props) {
  const ingredient = props.ingredient
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const { constructor } = useSelector(store => store.ingredients)

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  })

  useEffect(() => {
    const count = constructor.filter(item => item['_id'] === ingredient['_id']).length
    setCount(count)
  }, [constructor, ingredient])

   const addIngredient = () => {
    dispatch({
      type: ADD_TO_CONSTRUCTOR,
      el: ingredient
    })
  }

  const onClose = e => {
    if(e) e.stopPropagation()
    dispatch(setIngredient())
    setVisible(false)
  }

  const onOpen = () => {
    dispatch(setIngredient(ingredient))
    addIngredient()
    setVisible(true)
  }

  return (
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
      {
        visible && 
        <Modal onClose={onClose} header={'Детали ингредиента'}>
          <IngredientDetails/>
        </Modal>
      }
    </figure>
  )
}

Ingredient.propTypes = {
  ingredient: ingredient.isRequired
}
