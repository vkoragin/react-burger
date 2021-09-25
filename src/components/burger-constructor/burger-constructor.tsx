import { useState, useEffect, useCallback } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../total-price/total-price'
import NotBunIngredientsConstructor from '../not-bun-ingredients-constructor/not-bun-ingredients-constructor'
import styles from './burger-constructor.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { ADD_TO_CONSTRUCTOR, REORDER_INGREDIENTS, SET_UNIQUE_KEY } from '../../services/actions/actionTypes'
import type { ReduxStore } from '../../services/store.types'
import { TIngredient } from '../../types'

export default function BurgerConstructor () {
  const [bun, setBun] = useState<TIngredient>()
  const [otherIngredients, setOtherIngredients] = useState<TIngredient[]>([])
  const { constructor } = useSelector((store: ReduxStore) => store.ingredients)
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
      dispatch({
        type:  SET_UNIQUE_KEY, item})
    }
  })

  const isBun = constructor.filter(ingredient => ingredient.type === 'bun').length

  const moveElement = useCallback((dragIndex, hoverIndex) => {    
    const newElements = [...otherIngredients]
    if (isBun && bun) newElements.push(bun)
    newElements.splice(hoverIndex, 0, newElements.splice(dragIndex, 1)[0])
    dispatch({ type: REORDER_INGREDIENTS, newElements: newElements })
    }, [otherIngredients, bun, isBun, dispatch]
  )

  const renderElement = (ingredient: TIngredient, index: number) => {
    const uniqueKey = ingredient.uniqueKey ? ingredient.uniqueKey : 0.1
    return (
      <NotBunIngredientsConstructor
        key={uniqueKey}
        uniqueKey={uniqueKey}
        id={ingredient['_id']}
        index={index}
        moveElement={moveElement}
        text={ingredient.name}
        thumbnail={ingredient['image_mobile']}
        price={ingredient.price}
      />
    )
  }

  return (
    <div className={styles.burgerConstructor} ref={dropRef}>
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
          {otherIngredients.map((ingredient, i) => renderElement(ingredient, i))}   
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
