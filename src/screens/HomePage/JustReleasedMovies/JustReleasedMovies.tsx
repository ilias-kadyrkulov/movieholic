import MediumSlider from '@/components/Sliders/MediumSlider/MediumSlider'
import styles from './JustReleasedMovies.module.scss'

const JustReleasedMovies = () => {
  return (
    <div className={styles.JustReleasedMovies}>
      <div className={styles.Title}>Just released movies</div>
      <MediumSlider />
    </div>
  )
}

export default JustReleasedMovies
