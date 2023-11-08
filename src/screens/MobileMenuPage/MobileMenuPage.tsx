import { IoIosArrowBack } from 'react-icons/io'
import smallLogo from '../../assets/movieholic-favicon-color.png'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'
import styles from './MobileMenuPage.module.scss'
import CustomLink from '../../common/CustomLink/CustomLink'
import PagesList from '../../components/PagesList/PagesList'
import { useNavigate } from 'react-router-dom'
import SignupForm from '../../components/SignupForm/SignupForm'
import { useContext, useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { UserContext } from '../../App'

const MobileMenuPage = () => {
    const navigate = useNavigate()
    const [isSignupFormClicked, setIsSignupFormClicked] = useState(false)
    const [isLoginFormClicked, setIsLoginFormClicked] = useState(false)

    const user = useContext(UserContext)

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
            <div className={styles.Body}>
                <div
                    className={
                        isSignupFormClicked || isLoginFormClicked
                            ? styles.hidden
                            : styles.Buttons
                    }
                >
                    {user ? (
                        <button
                            className="border-green-700 bg-green-700 hover:opacity-90 ml-6"
                            onClick={() => {}}
                        >
                            Change profile
                        </button>
                    ) : (
                        <>
                            <button
                                className="border-gray-300 transition-colors hover:bg-purple-900 mr-6"
                                onClick={() => {
                                    setIsSignupFormClicked(!isSignupFormClicked)
                                }}
                            >
                                Sign up
                            </button>
                            <button
                                className="border-green-700 bg-green-700 hover:opacity-90 ml-6"
                                onClick={() => {
                                    setIsLoginFormClicked(!isLoginFormClicked)
                                }}
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
                <SignupForm formClicked={isSignupFormClicked} />
                <LoginForm formClicked={isLoginFormClicked} />

                <div
                    className={
                        isSignupFormClicked || isLoginFormClicked
                            ? styles.hidden
                            : ''
                    }
                >
                    <hr className="mt-5" />
                    <PagesList />
                </div>
            </div>
        </div>
    )
}

export default MobileMenuPage
