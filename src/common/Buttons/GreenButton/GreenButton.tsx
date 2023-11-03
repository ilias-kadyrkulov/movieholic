import { BsPlayCircle } from 'react-icons/bs'
import styles from './GreenButton.module.scss'
import { Link } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'

type PropsType = {
    text: string
    id: string
}

const GreenButton = ({ text, id }: PropsType) => {
    const { fileListEmptied } = useActions()
    return (
        <Link to={`title/${id}`}>
            <button
                className={styles.GreenButton}
                onClick={() => fileListEmptied()}
            >
                <BsPlayCircle />
                <span>{text}</span>
            </button>
        </Link>
    )
}

export default GreenButton
