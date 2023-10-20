import { BsPlayCircle } from 'react-icons/bs'
import styles from './PlayContinueButton.module.scss'

type PropsType = {
    text: string
}

const PlayContinueButton = ({ text }: PropsType) => {
    return (
        <button className={styles.PlayContinueButton}>
            <BsPlayCircle />
            <span>{text}</span>
        </button>
    )
}

export default PlayContinueButton
