import ReactDOM from 'react-dom'
import styles from './loader.module.css'
import PropTypes from 'prop-types'
import LoaderOverlay from '../loader-overlay/loader-overlay'

const loaderRoot = document.getElementById('loader')

export default function Loader (props) {
    const { text } = props

    return ReactDOM.createPortal (
        (
          <>
            <div className={styles.loader}>
                <p className='text text_type_main-default'>{text}</p>
            </div>
            <LoaderOverlay/>
          </>
        ), 
        loaderRoot
    )
}

Loader.propTypes = {
  text: PropTypes.string.isRequired
}