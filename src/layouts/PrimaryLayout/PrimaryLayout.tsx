import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { Carousel } from '../../components/Slider/Slider'

const PrimaryLayout = () => {
    return (
        <>
            <Header />
            <Carousel />
            <Outlet />
        </>
    )
}

export default PrimaryLayout
