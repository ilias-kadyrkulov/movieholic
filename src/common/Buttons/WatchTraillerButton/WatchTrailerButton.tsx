import styles from './WatchTrailerButton.module.scss'
import { Link } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { AiOutlinePlayCircle } from 'react-icons/ai'

type PropsType = {
    text: 'Watch Trailer'
    id: string | undefined
}

const WatchTrailerButton = ({ text, id }: PropsType) => {
    const { fileListEmptied } = useActions()
    return (
        <Link to={`/trailer/${id}`}>
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
