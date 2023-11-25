import { useGetTopBoxOfficeQuery } from "../../../api/show/titles.api"
import MediumSlider from "../../../components/Sliders/MediumSlider/MediumSlider"
import styles from './TopBoxOffice.module.scss'

const TopBoxOffice = () => {
    const {results} = useGetTopBoxOfficeQuery({
        list: 'top_boxoffice_200',
        info: 'base_info'
    }, {
        selectFromResult: ({ data }) => ({
            results: data?.results
        })
    })
    

    return (
        <div className={styles.TopBoxOffice}>
            <div className={styles.Title}>Top 200 all-time box office movies</div>
            <MediumSlider topBoxOffice={results} />
        </div>
    )
}

export default TopBoxOffice
