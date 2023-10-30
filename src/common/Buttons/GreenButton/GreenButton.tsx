import { BsPlayCircle } from 'react-icons/bs'
import styles from './GreenButton.module.scss'
import { Link } from 'react-router-dom'

type PropsType = {
    text: string
    id: string
}

const GreenButton = ({text, id}: PropsType) => {
    return (
        <Link to={`title/${id}`}>
            <button className={styles.GreenButton}>
                <BsPlayCircle />
                <span>{text}</span>
            </button>
        </Link>
    )
}

export default GreenButton
