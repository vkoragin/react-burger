import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DEL_FROM_CONSTRUCTOR } from '../../services/actions/actionTypes';

import styles from './not-bun-ingredients-constructor.module.css';

interface INotBunIngredientsConstructorProps {
  moveElement: (dragIndex: number, hoverIndex: number) => void;
  thumbnail: string;
  text: string;
  id: string;
  index: number;
  price: number;
  uniqueKey: number;
}

const NotBunIngredientsConstructor: FC<INotBunIngredientsConstructorProps> = ({
  thumbnail,
  text,
  id,
  index,
  moveElement,
  price,
  uniqueKey,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: 'other',

    hover(item: { index: number }, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'other',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const delIngredient = (uniqueKeyToDEl: number) => {
    dispatch({
      type: DEL_FROM_CONSTRUCTOR,
      uniqueKey: uniqueKeyToDEl,
    });
  };

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div className={styles.other} style={{ opacity }} ref={ref}>
      <DragIcon type="primary" />
      <div className={styles.otherItem}>
        <ConstructorElement
          isLocked={false}
          handleClose={() => delIngredient(uniqueKey)}
          text={text}
          thumbnail={thumbnail}
          price={price}
        />
      </div>
    </div>
  );
};

export default NotBunIngredientsConstructor;
