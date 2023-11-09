import { BsPlayCircle } from 'react-icons/bs'
import styles from './PlayContinueButton.module.scss'
import { Link } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'

type PropsType = {
    text: 'Play now'
    id: string | undefined
    titleType: 'Movie' | 'TV Series' | undefined
    titleText: string | undefined
}

const PlayContinueButton = ({ text, titleType, titleText }: PropsType) => {
    const { showBeenClicked } = useActions()

    const handleOnPlayButtonClick = () => {
        showBeenClicked({title: titleText, titleType: titleType})
    }

    return (
        <>
            {titleType === 'Movie' ? (
                <Link to={`movies/${titleText}`}>
                    <button className={styles.PlayContinueButton} onClick={handleOnPlayButtonClick}>
                        <BsPlayCircle />
                        <span>{text}</span>
                    </button>
                </Link>
            ) : (
                <Link to={`tvSeries/${titleText}/ep-1`}>
                    <button className={styles.PlayContinueButton}>
                        <BsPlayCircle />
                        <span>{text}</span>
                    </button>
                </Link>
            )}
        </>
    )
}

export default PlayContinueButton
