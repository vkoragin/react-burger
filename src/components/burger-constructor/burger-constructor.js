import { useState, useEffect, useCallback } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../total-price/total-price.js'
import NotBunIngredientsConstructor from '../not-bun-ingredients-constructor/not-bun-ingredients-constructor.js'
import styles from './burger-constructor.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { ADD_TO_CONSTRUCTOR, REORDER_INGREDIENTS } from '../../constants.js'

export default function BurgerConstructor () {
  const [bun, setBun] = useState([])
  const [otherIngredients, setOtherIngredients] = useState([])
  const { constructor } = useSelector(store => store.ingredients)
  const dispatch = useDispatch()

  useEffect(() => {
    setBun(constructor.filter(ingredient => ingredient.type === 'bun')[0])
    setOtherIngredients(constructor.filter(ingredient => ingredient.type !== 'bun')) 
  }, [constructor])

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch({
        type: ADD_TO_CONSTRUCTOR,
        el: item
      })
    }
  })

  const isBun = constructor.filter(ingredient => ingredient.type === 'bun').length

  const moveElement = useCallback((dragIndex, hoverIndex) => {    
    const newElements = [...otherIngredients]
    if (isBun) newElements.push(bun)
    newElements.splice(hoverIndex, 0, newElements.splice(dragIndex, 1)[0])
    dispatch({ type: REORDER_INGREDIENTS, newElements: newElements })
    }, [otherIngredients, bun, isBun, dispatch]
  )

  const renderElement = (ingredient, index, id) => {
    return (
      <NotBunIngredientsConstructor
        key={index}
        id={id}
        index={index}
        moveElement={moveElement}
        text={ingredient.name}
        thumbnail={ingredient['image_mobile']}
        price={ingredient.price}
      />
    )
  }

  return (
    <div className={styles.constructor} ref={dropRef}>
      <div className={styles.bun}>
          {
            bun &&
              <ConstructorElement
                type={'top'}
                isLocked={true} 
                text={bun.name + ' (верх)'} 
                thumbnail={bun['image_mobile']} 
                price={bun.price}/>
          }
        </div>
        
        <div className={styles.otherIngredients}>
          {otherIngredients.map((ingredient, i) => renderElement(ingredient, i, ingredient['_id']))}   
        </div>

        <div className={styles.bun}>
          {
            bun &&
              <ConstructorElement
                type={'bottom'}
                isLocked={true} 
                text={bun.name + ' (низ)'} 
                thumbnail={bun['image_mobile']} 
                price={bun.price}/> 
          }         
        </div>      
      <TotalPrice/>
    </div>
  )
}
