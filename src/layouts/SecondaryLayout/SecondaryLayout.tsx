import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'

const SecondaryLayout = () => {
    return (
        <>
                <div className="secondary-layout">
                    <Header />
                    <Outlet />
                </div>
        </>
    )
}

export default SecondaryLayout
