import { Outlet } from 'react-router-dom'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Footer from '@/components/Footer/Footer'

const PrimaryLayout = () => {
    return (
        <>
            <Header />
            <Hero />
            <Outlet />
            <Footer />
        </>
    )
}

export default PrimaryLayout
