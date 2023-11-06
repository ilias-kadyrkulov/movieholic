import { IoIosArrowBack } from 'react-icons/io'
import smallLogo from '../../assets/movieholic-favicon-color.png'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'
import styles from './MobileMenuPage.module.scss'
import CustomLink from '../../common/CustomLink/CustomLink'
import PagesList from '../../components/PagesList/PagesList'

const MobileMenuPage = () => {
    return (
        <div>
            <div className={styles.Header}>
                <div>
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
            <div className={styles.Body}>
                <div className={styles.Buttons}>
                    <button
                        className="border-gray-300 transition-colors hover:bg-purple-900 mr-6"
                        onClick={() => {}}
                    >
                        Sign up
                    </button>
                    <button
                        className="border-green-700 bg-green-700 hover:opacity-90 ml-6"
                        onClick={() => {}}
                    >
                        Login
                    </button>
                </div>
                <hr className='mt-5' />
                <PagesList />
            </div>
        </div>
    )
}

export default MobileMenuPage
