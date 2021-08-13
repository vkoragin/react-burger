import { useRef } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './not-bun-ingredients-constructor.module.css'
import { useDispatch } from 'react-redux'
import { useDrop, useDrag } from 'react-dnd'
import PropTypes from 'prop-types'
import { DEL_FROM_CONSTRUCTOR } from '../../constants.js'

export default function NotBunIngredientsConstructor ({ thumbnail, text, id, index, moveElement, price }) {
    const ref = useRef(null)
    const dispatch = useDispatch()

    const [, drop] = useDrop({
        accept: 'other',
        
        hover(item, monitor) {         
            if (!ref.current) return

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
           
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
            
            moveElement(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'other',
        item: () => {
            return { id, index }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })    
   
    const delIngredient = id => {
        dispatch({
            type: DEL_FROM_CONSTRUCTOR,
            id: id
        })
    }

    const opacity = isDragging ? 0 : 1

    drag(drop(ref))

    return (
        <div className={styles.other} style={{opacity: opacity}} ref={ref}>
            <DragIcon/>
            <div className={styles.otherItem}>
                <ConstructorElement
                    isLocked={false}
                    handleClose={() => delIngredient(id)}
                    text={text} 
                    thumbnail={thumbnail}
                    price={price}/>
            </div>
        </div>
    )
}

NotBunIngredientsConstructor.propTypes = {
    moveElement: PropTypes.func.isRequired,
    thumbnail: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
}
