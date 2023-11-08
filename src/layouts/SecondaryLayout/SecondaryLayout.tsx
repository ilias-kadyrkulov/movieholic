import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { useAppSelector } from '../../hooks/hooks'
import VideoPlayer from '../../components/Players/TVSeriesPlayer/TVSeriesPlayer'

const SecondaryLayout = () => {
    // const { enabled } = useAppSelector((state) => state.player)
    return (
        <>
            {/* {!enabled && ( */}
                <div className="secondary-layout">
                    <Header />
                    <Outlet />
                </div>
            {/* )} */}
            {/* {enabled && <VideoPlayer />} */}
        </>
    )
}

export default SecondaryLayout
