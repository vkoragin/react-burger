import ReactDOM from 'react-dom'
import styles from './loader.module.css'
import LoaderOverlay from '../loader-overlay/loader-overlay'

const loaderRoot = document.getElementById('loader') as HTMLElement

export default function Loader (props: { text: string }) {
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
