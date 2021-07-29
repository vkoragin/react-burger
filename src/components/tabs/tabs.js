import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export default function Tabs (props) {      
  const current = 'Булки'

  return (
    <div style={{ display: 'flex', paddingBottom: '40px' }}>
        {props.ingredientsTypes.map((ingredientsType, index) => (
          <Tab value={ingredientsType} 
               active={current === ingredientsType} 
               key={index}
          >{ingredientsType}
          </Tab>
        ))}
    </div> 
  )
}

Tabs.propTypes = {
  ingredientsTypes: PropTypes.arrayOf(PropTypes.string).isRequired
}