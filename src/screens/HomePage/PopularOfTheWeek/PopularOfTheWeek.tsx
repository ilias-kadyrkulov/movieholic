import { useGetTrendingMoviesQuery } from '../../../api/tmdbV3/trending.api'
import SmallSlider from '../../../components/Sliders/SmallSlider/SmallSlider'
import styles from './PopularOfTheWeek.module.scss'

const PopularOfTheWeek = () => {
  const { data: trendingMoviesData } = useGetTrendingMoviesQuery({
    time_window: 'week',
  })

  return (
    <div className={styles.PopularOfTheWeek}>
      <div className={styles.Title}>Popular of the week</div>
      <SmallSlider data={trendingMoviesData?.results} />
    </div>
  )
}

export default PopularOfTheWeek
