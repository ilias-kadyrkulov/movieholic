import { BsPlayCircle } from 'react-icons/bs'
import styles from './PlayContinueButton.module.scss'
import { Link } from 'react-router-dom'

type PropsType = {
    text: 'Play now'
    titleType: 'movie' | 'tv' | undefined
    titleText: string | undefined
    season?: number
}

const ShowPagePlayButton = ({ text, titleType, titleText, season }: PropsType) => {

    return (
        <>
            {titleType === 'movie' ? (
                <Link to={`${titleText}`}>
                    <button
                        className={styles.PlayContinueButton}
                    >
                        <BsPlayCircle />
                        <span>{text}</span>
                    </button>
                </Link>
            ) : (
                <Link to={`${titleText}/season/${season}/ep-1`}>
                    <button className={styles.PlayContinueButton}>
                        <BsPlayCircle />
                        <span>{text}</span>
                    </button>
                </Link>
            )}
        </>
    )
}

export default ShowPagePlayButton
