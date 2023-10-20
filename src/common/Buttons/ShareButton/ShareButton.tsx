import { BsPlayCircle } from 'react-icons/bs'
import styles from './ShareButton.module.scss'

const ShareButton = () => {
    return (
        <button className={styles.ShareButton}>
            <BsPlayCircle />
            <span>Share</span>
        </button>
    )
}

export default ShareButton
