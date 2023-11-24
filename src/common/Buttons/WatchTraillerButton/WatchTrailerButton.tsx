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
    <button className={styles.WatchTrailerButton} onClick={() => fileListEmptied()}>
      <AiOutlinePlayCircle />
      <Link to={`trailer/${tmdbId}`}>{text}</Link>
    </button>
  )
}

export default WatchTrailerButton
