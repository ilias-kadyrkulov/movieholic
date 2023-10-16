import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'

const PrimaryLayout = () => {
    return (
        <>
            <Header />
            <Hero />
            <Outlet />
        </>
    )
}

export default PrimaryLayout
