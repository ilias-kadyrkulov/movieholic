import { HiOutlineShare } from 'react-icons/hi'
import styles from './ShareButton.module.scss'

const ShareButton = () => {
    return (
        <button className={styles.ShareButton} disabled>
            <HiOutlineShare />
            <span>Share</span>
        </button>
    )
}

export default ShareButton
