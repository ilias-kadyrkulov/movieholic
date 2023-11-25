import PopularOfTheWeek from './PopularOfTheWeek/PopularOfTheWeek'
import TopBoxOffice from './TopBoxOffice/TopBoxOffice'
import styles from './HomePage.module.scss'
import { useAppSelector } from '../../hooks/hooks'
import Favorite from './Favorite/Favorite'
import Watchlist from './Watchlist/WatchList'

const HomePage = () => {
  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const movieFavorite = useAppSelector((state) => state.movieFavorite)

  return (
    <div className={styles.Home}>
      <TopBoxOffice />
      <PopularOfTheWeek />
      {tmdbAccount && movieWatchlist && <Watchlist />}
      {tmdbAccount && movieFavorite && <Favorite />}
    </div>
  )
}

export default HomePage
