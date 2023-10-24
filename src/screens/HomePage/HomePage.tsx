import { User } from 'firebase/auth'
import PopularOfTheWeek from './PopularOfTheWeek/PopularOfTheWeek'
import TopBoxOffice from './TopBoxOffice/TopBoxOffice'
import { WatchList } from './WatchList/WatchList'

const HomePage = ({ authUser }: { authUser: User | null}) => {
    return (
        <div className="home mt-10 mx-12">
            <TopBoxOffice />
            <PopularOfTheWeek />
            {authUser && <WatchList authUser={authUser} />}
        </div>
    )
}

export default HomePage
