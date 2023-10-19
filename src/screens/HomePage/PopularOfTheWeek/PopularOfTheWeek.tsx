import { useGetPopularOfTheWeekQuery } from '../../../api/titles.api'
import SmallSlider from '../../../components/SmallSlider/SmallSlider'
import styles from './PopularOfTheWeek.module.scss'

const PopularOfTheWeek = () => {
    const { results } = useGetPopularOfTheWeekQuery(
        {
            list: 'top_boxoffice_last_weekend_10',
            info: 'base_info'
        },
        {
            selectFromResult: ({ data }) => ({
                results: data?.results
            })
        }
    )

    return (
        <div className={styles.popularOfTheWeek}>
            <div className="font-bold text-2xl text-white mb-8">
                Popular of the week
            </div>
            <SmallSlider popularOfTheWeek={results} />
        </div>
    )
}

export default PopularOfTheWeek
