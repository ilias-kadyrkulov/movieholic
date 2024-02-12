import { GrBookmark } from 'react-icons/gr'
import styles from './WatchlistButton.module.scss'
import {
  useMovieWatchlistMutation,
  useTvWatchlistMutation,
} from '@/api/tmdbV3/account.api'
import { useAppSelector } from '@/hooks/hooks'
import { useActions } from '@/hooks/useActions'

const WatchlistButton = ({
  text,
  tmdbId,
  titleType,
  tmdbAcc
}: {
  text: 'Add to Watchlist' | 'Remove from Watchlist'
  tmdbId: number | undefined
  titleType: 'movie' | 'tv'
  tmdbAcc?: string
}) => {
  const [manipulateMovieWatchlist] = useMovieWatchlistMutation()
  const [manipulateTVWatchlist] = useTvWatchlistMutation()
  
  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)

  const {
    movieWatchlistCleared,
    tvSeriesWatchlistCleared,
  } = useActions()

  const handleAddToMovieWatchlist = async () => {
    const result = await manipulateMovieWatchlist({
      mediaId: tmdbId,
      boolean: true,
      session_id: sessionId,
    })
    console.log(result)

    movieWatchlistCleared() //TODO - May be optimized? Too much operations?
  }

  const handleRemoveFromMovieWatchlist = async () => {
    const result = await manipulateMovieWatchlist({
      mediaId: tmdbId,
      boolean: false,
      session_id: sessionId,
    })
    console.log(result)

    movieWatchlistCleared()
  }

  const handleAddToTVWatchlist = async () => {
    const result = await manipulateTVWatchlist({
      mediaId: tmdbId,
      boolean: true,
      session_id: sessionId,
    })
    console.log(result)

    tvSeriesWatchlistCleared() //TODO - May be optimized? Too much operations?
  }

  const handleRemoveFromTVWatchlist = async () => {
    const result = await manipulateTVWatchlist({
      mediaId: tmdbId,
      boolean: false,
      session_id: sessionId,
    })
    console.log(result)

    tvSeriesWatchlistCleared()
  }

  return (
    <>
      {titleType === 'movie' && text === 'Add to Watchlist' && tmdbAcc && (
        <button className={styles.WatchlistButton} onClick={handleAddToMovieWatchlist}>
          <GrBookmark />
          <span>{text}</span>
        </button>
      )}
      {titleType === 'movie' && text === 'Remove from Watchlist' && (
        <button className={styles.WatchlistButton} onClick={handleRemoveFromMovieWatchlist}>
          <GrBookmark />
          <span>{text}</span>
        </button>
      )}

      {titleType === 'tv' && text === 'Add to Watchlist' && tmdbAcc && (
        <button className={styles.WatchlistButton} onClick={handleAddToTVWatchlist}>
          <GrBookmark />
          <span>{text}</span>
        </button>
      )}
      {titleType === 'tv' && text === 'Remove from Watchlist' && (
        <button className={styles.WatchlistButton} onClick={handleRemoveFromTVWatchlist}>
          <GrBookmark />
          <span>{text}</span>
        </button>
      )}
    </>
  )
}

export default WatchlistButton
