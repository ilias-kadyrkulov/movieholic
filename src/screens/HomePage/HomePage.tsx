import PopularOfTheWeek from './PopularOfTheWeek/PopularOfTheWeek'
import TopBoxOffice from './TopBoxOffice/TopBoxOffice'
import { WatchList } from './WatchList/WatchList'
import { useContext } from 'react'
import { UserContext } from '../../App'

const HomePage = () => {
    const user = useContext(UserContext)

    return (
        <div className="home mt-10 mx-12">
            <TopBoxOffice />
            <PopularOfTheWeek />
            {user && <WatchList />}
        </div>
    )
}

export default HomePage
