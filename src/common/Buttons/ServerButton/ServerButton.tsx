import { BsPlayCircle } from 'react-icons/bs'
import styles from './ServerButton.module.scss'

type PropsType = {
    text: string
    onServerClick: () => void
    serverChosen: 'Filemoon' | 'Vidplay'
}

const ServerButton = ({ text, onServerClick, serverChosen }: PropsType) => {
    return (
            <button
                className={`${serverChosen === text ? styles.ServerButton + ' ' + styles.active : styles.ServerButton}`}
                onClick={onServerClick}
            >
                <span>{text}</span>
                <BsPlayCircle />
            </button>
    )
}

export default ServerButton
