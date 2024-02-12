import { useGetMoviesFavoriteQuery, useGetTVFavoriteQuery } from '@/api/tmdbV3/account.api'
import BaseMovieSlider from '@/components/Sliders/BaseMovieSlider/BaseMovieSlider'
import BaseTVSlider from '@/components/Sliders/BaseTVSlider/BaseTVSlider'
import { useAppSelector } from '@/hooks/hooks'
import { useActions } from '@/hooks/useActions'
import styles from './Favorite.module.scss'
import { useEffect } from 'react'

const Favorite = () => {
  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)

  const { movieFavoriteCleared, favoriteShowsReceived, likeListCleared } = useActions()

  const { data: movieFavoriteData } = useGetMoviesFavoriteQuery({
    session_id: sessionId
  })

  const { data: tvFavoriteData } = useGetTVFavoriteQuery({
    session_id: sessionId
  })

  useEffect(() => {
    movieFavoriteCleared() //TODO - May be optimized? Unnecessary state cleaning?
  }, [])

  useEffect(() => {
    likeListCleared()
    movieFavoriteData && favoriteShowsReceived(movieFavoriteData.results.map(item => item.id))
    tvFavoriteData && favoriteShowsReceived(tvFavoriteData.results.map(item => item.id))
  }, [movieFavoriteData, tvFavoriteData])
  return (
    <div className={styles.Favorite}>
      {movieFavoriteData && movieFavoriteData.results.length > 0 && (
        <>
          <div className={styles.Title}>Your favorite movies</div>
          <BaseMovieSlider data={movieFavoriteData.results} />
        </>
      )}
      {tvFavoriteData && tvFavoriteData.results.length > 0 && (
        <>
          <div className={styles.Title}>Your favorite series</div>
          <BaseTVSlider data={tvFavoriteData.results} />
        </>
      )}
    </div>
  )
}

export default Favorite
