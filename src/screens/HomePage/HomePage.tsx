import PopularOfTheWeek from './PopularOfTheWeek/PopularOfTheWeek'
import TopBoxOffice from './TopBoxOffice/TopBoxOffice'

const HomePage = () => {
    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    // if(error) {
    //   return <div>ERROR!</div>
    // }

    return (
        <div className="home mt-10 mx-12">
            <TopBoxOffice />
            <PopularOfTheWeek />
        </div>
    )
}

export default HomePage
