import { useGetLatestReleasedMoviesQuery } from '../../../api/tmdbV3/movies.api'
import MediumSlider from '../../../components/Sliders/MediumSlider/MediumSlider'
import { useActions } from '../../../hooks/useActions'
import styles from './JustReleasedMovies.module.scss'
import { useEffect } from 'react';

const JustReleasedMovies = () => {
  const current = new Date()
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
  const { data: latestMovieData } = useGetLatestReleasedMoviesQuery(date)

  const { latestReleasedMovieReceived, latestReleasedMoviesCleared } = useActions()

  useEffect(() => {
    latestReleasedMoviesCleared()
    latestMovieData && latestReleasedMovieReceived(latestMovieData.results)
  }, [latestMovieData])

  return (
    <div className={styles.JustReleasedMovies}>
      <div className={styles.Title}>Just released movies</div>
      <MediumSlider />
    </div>
  )
}

export default JustReleasedMovies
