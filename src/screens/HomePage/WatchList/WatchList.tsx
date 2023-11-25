import MovieWatchlistSlider from '../../../components/Sliders/MovieWatchlistSlider/MovieWatchlistSlider'
import styles from './Watchlist.module.scss'

const Watchlist = () => {
  return (
    <div className={styles.Watchlist}>
      <div className={styles.Title}>Your movie watchlist</div>
      <MovieWatchlistSlider />
    </div>
  )
}

export default Watchlist
