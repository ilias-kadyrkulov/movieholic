import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import styled from 'styled-components'
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

const Logo1024 = styled.img``


const Header = () => {
    const [authUser, setAuthUser] = useState<User | null>(null)
    const [signupFormClicked, setSignupFormClicked] = useState(false)
    const [loginFormClicked, setLoginFormClicked] = useState(false)

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
    console.log(window.window.outerWidth)

    return (
        <>
            <div className={styles.Header}>
                <div className="left">
                    <CustomLink to="/">
                        {window.window.innerWidth <= 1024 ? <img className="w-10 h-12" src={smallLogo} alt="Logo" /> : <img className="w-46 h-12" src={logo} alt="Logo" />}
                    </CustomLink>
                </div>
                <div className={styles.Center}>
                    <div>
                        <CustomLink to="/">Home</CustomLink>
                    </div>
                    <div>
                        <CustomLink to="/discover">Discover</CustomLink>
                    </div>
                    <div>
                        <CustomLink to="/movie-release">
                            Movie Release
                        </CustomLink>
                    </div>
                    <div>
                        <CustomLink to="/forum">Forum</CustomLink>
                    </div>
                    <div>
                        <CustomLink to="/about">About</CustomLink>
                    </div>
                </div>
                <div className={styles.Right}>
                    <div>
                        <AiOutlineSearch />
                    </div>
                    {authUser ? (
                        <div className="relative transition-all">
                            <div className="flex relative items-center">
                                <div className="absolute top-10 w-36 h-16 py-2 bg-slate-800 transition-all">
                                    <p className="cursor-pointer">Profile</p>
                                    <p
                                        className="cursor-pointer"
                                        onClick={handleSignOut}
                                    >
                                        Sign out
                                    </p>
                                </div>
                                <IoMdNotificationsOutline />
                                <div className={styles.Avatar}>
                                    <img
                                        src={avatarDummy}
                                        className="w-10 h-10 rounded-3xl"
                                        alt="Avatar"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
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
