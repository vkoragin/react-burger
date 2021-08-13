import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

export default function Tabs (props) { 
  const { activeTab } = useSelector(store => store.activeTab)

  return (
    <div style={{ display: 'flex', paddingBottom: '40px' }}>
        {props.ingredientsTypes.map((ingredientsType, index) => (
          <Tab value={ingredientsType} 
               active={activeTab === ingredientsType} 
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