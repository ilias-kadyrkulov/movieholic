import PopularOfTheWeek from './PopularOfTheWeek/PopularOfTheWeek'
import TopBoxOffice from './TopBoxOffice/TopBoxOffice'
import styles from './HomePage.module.scss'
import { useAppSelector } from '../../hooks/hooks'
import Watchlist from './Watchlist/Watchlist'

const HomePage = () => {
  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)

  return (
    <div className={styles.Home}>
      <TopBoxOffice />
      <PopularOfTheWeek />
      {tmdbAccount && movieWatchlist && <Watchlist />}
    </div>
  )
}

export default HomePage
