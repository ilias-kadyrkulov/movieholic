import { HiOutlineShare } from 'react-icons/hi'
import styles from './ShareButton.module.scss'

const ShareButton = () => {
    return (
        <button className={styles.ShareButton}>
            <HiOutlineShare />
            <span>Share</span>
        </button>
    )
}

export default ShareButton
