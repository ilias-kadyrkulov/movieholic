import { GrBookmark } from 'react-icons/gr'
import styles from './MovieWatchlistButton.module.scss'
import { useMovieWatchlistMutation } from '../../../api/tmdbV3/account.api'
import { useAppSelector } from '../../../hooks/hooks'
import { useActions } from '../../../hooks/useActions'

const MovieWatchlistButton = ({
  text,
  tmdbId,
}: {
  text: 'Add to Watchlist' | 'Remove from Watchlist'
  tmdbId: number | undefined
}) => {
  const [manipulateMovieWatchlist] = useMovieWatchlistMutation()

  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)

  const {movieDeletedFromWatchlist, movieWatchlistCleared} = useActions()

  const handleAddToWatchlist = async () => {
    const result = await manipulateMovieWatchlist({
      mediaType: 'movie',
      mediaId: tmdbId,
      boolean: true,
      session_id: sessionId,
    })
    console.log(result)

    movieWatchlistCleared() //TODO - May be optimized? Too much operations?
  }

  const handleRemoveFromWatchlist = async () => {
    const result = await manipulateMovieWatchlist({
      mediaType: 'movie',
      mediaId: tmdbId,
      boolean: false,
      session_id: sessionId,
    })
    console.log(result)

    movieDeletedFromWatchlist(tmdbId)
  }

  return (
    <>
      {text === 'Add to Watchlist' && (
        <button className={styles.MovieWatchlistButton} onClick={handleAddToWatchlist}>
          <GrBookmark />
          <span>{text}</span>
        </button>
      )}
      {text === 'Remove from Watchlist' && (
        <button className={styles.MovieWatchlistButton} onClick={handleRemoveFromWatchlist}>
          <GrBookmark />
          <span>{text}</span>
        </button>
      )}
    </>
  )
}

export default MovieWatchlistButton
