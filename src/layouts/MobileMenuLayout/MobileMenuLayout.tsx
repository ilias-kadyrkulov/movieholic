import { Outlet, useNavigate } from 'react-router-dom'
import styles from './MobileMenuLayout.module.scss'
import { IoIosArrowBack } from 'react-icons/io'
import CustomLink from '../../common/CustomLink/CustomLink'
import smallLogo from '../../assets/movieholic-favicon-color.png'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'

const MobileMenuLayout = () => {
    const navigate = useNavigate()
    
    return (
        <div>
            <div className={styles.Header}>
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    <IoIosArrowBack />
                </div>
                <div>
                    <CustomLink to="/">
                        <img src={smallLogo} className="h-7 w-7" />
                    </CustomLink>
                </div>
                <div>
                    <BurgerMenu />
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default MobileMenuLayout
