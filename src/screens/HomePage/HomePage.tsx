import PopularOfTheWeek from './PopularOfTheWeek/PopularOfTheWeek'
import JustReleasedMovies from './JustReleasedMovies/JustReleasedMovies'
import styles from './HomePage.module.scss'
import { useAppSelector } from '../../hooks/hooks'
import Favorite from './Favorite/Favorite'
import TrendingToday from './TrendingToday/TrendingToday'
import { useGetMovieGenresQuery, useGetTVGenresQuery } from '../../api/tmdbV3/genres.api'
import Watchlist from './Watchlist/Watchlist'
import { useActions } from '../../hooks/useActions'
import { useEffect } from 'react'

const HomePage = () => {
  const { data: movieGenresData } = useGetMovieGenresQuery()
  const { data: tvGenresData } = useGetTVGenresQuery()

  const { movieGenresReceived, tvGenresReceived } = useActions()

  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const movieFavorite = useAppSelector((state) => state.movieFavorite)

  const movieGenresObj = movieGenresData?.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name
    return acc
  }, {} as Record<number, string>)

  const tvGenresObj = tvGenresData?.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name
    return acc
  }, {} as Record<number, string>)

  useEffect(() => {
    movieGenresData && movieGenresReceived(movieGenresObj)
  }, [movieGenresData])

  useEffect(() => {
    tvGenresData && tvGenresReceived(tvGenresObj)
  }, [tvGenresData])

  return (
    <div className={styles.Home}>
      <JustReleasedMovies />
      <PopularOfTheWeek />
      <TrendingToday />
      {tmdbAccount && movieWatchlist && <Watchlist />}
      {tmdbAccount && movieFavorite && <Favorite />}
    </div>
  )
}

export default HomePage
