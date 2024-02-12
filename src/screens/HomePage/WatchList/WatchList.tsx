import { useGetMoviesWatchlistQuery, useGetTVWatchlistQuery } from '@/api/tmdbV3/account.api'
import BaseMovieSlider from '@/components/Sliders/BaseMovieSlider/BaseMovieSlider'
import BaseTVSlider from '@/components/Sliders/BaseTVSlider/BaseTVSlider'
import { useAppSelector } from '@/hooks/hooks'
import { useActions } from '@/hooks/useActions'
import styles from './Watchlist.module.scss'
import { useEffect } from 'react'

const Watchlist = () => {
  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)

  const {
    movieWatchlistReceived,
    movieWatchlistCleared,
    tvSeriesWatchlistReceived,
    tvSeriesWatchlistCleared
  } = useActions()

  const { data: movieWatchlistData } = useGetMoviesWatchlistQuery({
    session_id: sessionId,
  })

  const { data: tvWatchlistData } = useGetTVWatchlistQuery({
    session_id: sessionId,
  })

  useEffect(() => {
    movieWatchlistCleared() //TODO - May be optimized? Unnecessary state cleaning?
  }, [])

  useEffect(() => {
    tvSeriesWatchlistCleared() //TODO - May be optimized? Unnecessary state cleaning?
  }, [])

  useEffect(() => {
    movieWatchlistData && movieWatchlistReceived(movieWatchlistData.results.map((item) => item.id))
  }, [movieWatchlistData])

  useEffect(() => {
    tvWatchlistData && tvSeriesWatchlistReceived(tvWatchlistData.results.map((item) => item.id))
  }, [tvWatchlistData])

  return (
    <div className={styles.Watchlist}>
      {movieWatchlistData && movieWatchlistData.results.length > 0 && (
        <>
          <div className={styles.Title}>Your movie watchlist</div>
          <BaseMovieSlider data={movieWatchlistData.results} />
        </>
      )}
      {tvWatchlistData && tvWatchlistData.results.length > 0 && (
        <>
          <div className={styles.Title}>Your series watchlist</div>
          <BaseTVSlider data={tvWatchlistData.results} />
        </>
      )}
    </div>
  )
}

export default Watchlist
