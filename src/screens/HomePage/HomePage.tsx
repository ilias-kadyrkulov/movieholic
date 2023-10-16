import { useGetJustReleasedTitlesQuery } from '../../api/titles.api'
import MediumSlider from '../../components/MediumSlider/MediumSlider'
import styles from './HomePage.module.scss'

const HomePage = () => {
    const { results } = useGetJustReleasedTitlesQuery({
        list: 'top_boxoffice_last_weekend_10',
        info: 'base_info'
    }, {
      selectFromResult: ({data}) => ({
        results: data?.results
      })
    })

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    // if(error) {
    //   return <div>ERROR!</div>
    // }

    return (
        <div className="home mt-10">
            <div className={styles.mostPopularMovies}>
                <div>Most Popular Movies</div>
                <MediumSlider mostPopularMovies={results} />
            </div>
        </div>
    )
}

export default HomePage
