import styles from './WatchTrailerButton.module.scss'
import { Link } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { AiOutlinePlayCircle } from 'react-icons/ai'

type PropsType = {
    text: 'Watch Trailer'
    tmdbId: number | undefined
}

const WatchTrailerButton = ({ text, tmdbId }: PropsType) => {
    const { fileListEmptied } = useActions()
    return (
        <Link to={`trailer/${tmdbId}`}>
            <button
                className={styles.WatchTrailerButton}
                onClick={() => fileListEmptied()}
            >
                <AiOutlinePlayCircle />
                <span>{text}</span>
            </button>
        </Link>
    )
}

export default WatchTrailerButton
