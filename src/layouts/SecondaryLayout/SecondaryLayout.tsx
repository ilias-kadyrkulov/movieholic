import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const SecondaryLayout = () => {
    return (
        <>
                <div className="secondary-layout">
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
        </>
    )
}

export default SecondaryLayout
