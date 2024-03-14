import { useEffect } from 'react'
import { useAppSelector } from '@/hooks/hooks'
import { useActions } from '@/hooks/useActions'
import {
    useGetMovieGenresQuery,
    useGetTVGenresQuery
} from '@/api/tmdbV3/genres.api'
import { WatchList } from './WatchList/WatchList'
import PopularOfTheWeek from './PopularOfTheWeek/PopularOfTheWeek'
import JustReleasedMovies from './JustReleasedMovies/JustReleasedMovies'
import Favorite from './Favorite/Favorite'
import TrendingToday from './TrendingToday/TrendingToday'
import styles from './HomePage.module.scss'

const HomePage = () => {
    const { data: movieGenresData } = useGetMovieGenresQuery()
    const { data: tvGenresData } = useGetTVGenresQuery()

    const { movieGenresReceived, tvGenresReceived } = useActions()

    const tmdbAccount = useAppSelector(state => state.tmdbAccount.username)
    const movieWatchlist = useAppSelector(state => state.movieWatchlist)
    const movieFavorite = useAppSelector(state => state.movieFavorite)

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
            {tmdbAccount && movieWatchlist && <WatchList />}
            {tmdbAccount && movieFavorite && <Favorite />}
        </div>
    )
}

export default HomePage
