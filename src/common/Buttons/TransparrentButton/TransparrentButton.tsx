import { GrBookmark } from 'react-icons/gr'
import styles from './TransparrentButton.module.scss'

const TransparrentButton = ({text}: {text: string}) => {
    return (
        <button className={styles.TransparrentButton}>
            <GrBookmark />
            <span>{text}</span>
        </button>
    )
}

export default TransparrentButton
