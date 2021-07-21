import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function Tabs (props) {      
  const [current, setCurrent] = React.useState(props.ingredientsTypes[0])

  function setCurrentIngredient(ingredientsType) {
    setCurrent(ingredientsType)
    props.setCurrentIngredient(ingredientsType)
  }

  return (
    <div style={{ display: 'flex', paddingBottom: '40px' }}>
        {props.ingredientsTypes.map((ingredientsType, index) => (
          <Tab value={ingredientsType} 
               active={current === ingredientsType} 
               onClick={() => setCurrentIngredient(ingredientsType)} 
               key={index}
          >{ingredientsType}
          </Tab>
        ))}
    </div> 
  )
}

export default Tabs