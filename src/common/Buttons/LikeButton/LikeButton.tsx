import { BiLike } from 'react-icons/bi'
import styles from './LikeButton.module.scss'

const LikeButton = () => {
    return (
        <button className={styles.LikeButton}>
            <BiLike />
            <span>Like</span>
        </button>
    )
}

export default LikeButton
