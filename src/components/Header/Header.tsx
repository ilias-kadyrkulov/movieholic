import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/logo-low-resolution.png'
import smallLogo from '../../assets/movieholic-favicon-color.png'
import avatarDummy from '../../assets/pianoCrop.jpg'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import SignupForm from '../SignupForm/SignupForm'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import LoginForm from '../LoginForm/LoginForm'
import { useActions } from '../../hooks/useActions'
import CustomLink from '../../common/CustomLink/CustomLink'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import PagesList from '../PagesList/PagesList'
import { Link } from 'react-router-dom'

const Header = () => {
    const [authUser, setAuthUser] = useState<User | null>(null)
    const [signupFormClicked, setSignupFormClicked] = useState(false)
    const [loginFormClicked, setLoginFormClicked] = useState(false)
    const [isProfileClicked, setIsProfileClicked] = useState(false)

    const { watchListCleared, showListCleared } = useActions()

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    const handleSignOut = () => {
        signOut(auth)
        watchListCleared()
        showListCleared()
    }

    const handleSignUpFormOnClose = () => {
        setSignupFormClicked(false)
    }
    const handleLoginFormOnClose = () => {
        setLoginFormClicked(false)
    }

    const handleSignupFormOnClick = () => {
        setSignupFormClicked(true)
        setLoginFormClicked(false)
    }
    const handleLoginFormOnClick = () => {
        setLoginFormClicked(true)
        setSignupFormClicked(false)
    }

    const handleProfileClick = () => {
        setIsProfileClicked(!isProfileClicked)
    }
    console.log(window.window.outerWidth)

    return (
        <>
            <div className={styles.Header}>
                <div className="left">
                    <CustomLink to="/">
                        {window.window.innerWidth <= 1024 ? (
                            <img
                                className="w-10 h-12"
                                src={smallLogo}
                                alt="Logo"
                            />
                        ) : (
                            <img className="w-40 h-10" src={logo} alt="Logo" />
                        )}
                    </CustomLink>
                </div>
                <div className={styles.Center}>
                    <PagesList />
                </div>
                <div className={styles.Right}>
                    <div>
                        <AiOutlineSearch />
                    </div>

                    {authUser ? ( //TODO - Profile page
                        <>
                            <div className={styles.Laptop}>
                                <div className="flex relative items-center">
                                    <div
                                        className={
                                            isProfileClicked
                                                ? styles.ProfileActive
                                                : styles.Profile
                                        }
                                    >
                                        <p className="cursor-pointer">
                                            Profile
                                        </p>
                                        <p
                                            className="cursor-pointer"
                                            onClick={handleSignOut}
                                        >
                                            Sign out
                                        </p>
                                    </div>
                                    <IoMdNotificationsOutline />
                                    <div
                                        className={
                                            isProfileClicked
                                                ? styles.AvatarActive
                                                : styles.Avatar
                                        }
                                        onClick={handleProfileClick}
                                    >
                                        <img
                                            src={avatarDummy}
                                            className="w-10 h-10 rounded-3xl"
                                            alt="Avatar"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.MobileTablet}>
                                <div className="flex relative items-center">
                                    <IoMdNotificationsOutline />
                                    <Link to="/mobile-menu">
                                        <img
                                            src={avatarDummy}
                                            className="w-10 h-10 rounded-3xl"
                                            alt="Avatar"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.LaptopDesktop}>
                                <div className="flex">
                                    <button
                                        className="border-gray-300 border-2 rounded-md transition-colors hover:bg-purple-900"
                                        onClick={handleSignupFormOnClick}
                                    >
                                        Sign up
                                    </button>
                                    <button
                                        className="border-green-700 border-2 rounded-md bg-green-700 hover:opacity-90"
                                        onClick={handleLoginFormOnClick}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                            <BurgerMenu />
                        </>
                    )}
                </div>
            </div>
            <SignupForm
                formClicked={signupFormClicked}
                closeForm={handleSignUpFormOnClose}
            />
            <LoginForm
                formClicked={loginFormClicked}
                closeForm={handleLoginFormOnClose}
            />
        </>
    )
}

export default Header
