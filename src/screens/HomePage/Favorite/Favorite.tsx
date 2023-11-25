import MovieFavoriteSlider from '../../../components/Sliders/MovieFavoriteSlider/MovieFavoriteSlider'
import styles from './Favorite.module.scss'

const Favorite = () => {
  return (
    <div className={styles.Favorite}>
      <div className={styles.Title}>Your favorite movies</div>
      <MovieFavoriteSlider />
    </div>
  )
}

export default Favorite
