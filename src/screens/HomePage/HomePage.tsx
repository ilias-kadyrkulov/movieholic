import PopularOfTheWeek from './PopularOfTheWeek/PopularOfTheWeek'
import TopBoxOffice from './TopBoxOffice/TopBoxOffice'
import { WatchList } from './WatchList/WatchList'
import { useContext } from 'react'
import { UserContext } from '../../App'
import styles from './HomePage.module.scss'

const HomePage = () => {
    const user = useContext(UserContext)

    return (
        <div className={styles.Home}>
            <TopBoxOffice />
            <PopularOfTheWeek />
            {user && <WatchList />}
        </div>
    )
}

export default HomePage
