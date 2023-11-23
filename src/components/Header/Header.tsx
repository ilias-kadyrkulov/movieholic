import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/logo-low-resolution.png'
import smallLogo from '../../assets/movieholic-favicon-color.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import SignupForm from '../Forms/SignupForm/SignupForm'
import LoginForm from '../Forms/LoginForm/LoginForm'
import { useActions } from '../../hooks/useActions'
import CustomLink from '../../common/CustomLink/CustomLink'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import PagesList from '../PagesList/PagesList'
import { Link, useNavigate } from 'react-router-dom'
import {
    useCreateRequestTokenQuery,
    useDeleteSessionMutation
    // usePrefetch
} from '../../api/tmdbV3/auth.api'
import { useAppSelector } from '../../hooks/hooks'
import { tmdbApiConfig } from '../../api/tmdbV3/tmdb.api'
import { RotatingLines } from 'react-loader-spinner'

const Header = () => {
    const { data: requestTokenData } = useCreateRequestTokenQuery()
    const [deleteSession] = useDeleteSessionMutation()
    // const prefetchRequestToken = usePrefetch('createRequestToken')

    const [signupFormClicked, setSignupFormClicked] = useState(false)
    const [loginFormClicked, setLoginFormClicked] = useState(false)
    const [isProfileClicked, setIsProfileClicked] = useState(false)

    const tmdbAccount = useAppSelector((state) => state.tmdbAccount)
    const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)
    const requestToken = useAppSelector(
        (state) => state.tmdbSession.requestToken
    )
    const validatedRequestToken = useAppSelector(
        (state) => state.tmdbSession.validatedToken
    )

    const {
        watchListCleared,
        likeListCleared,
        requestTokenStored,
        requestTokenCleared,
        validatedTokenCleared,
        sessionBeenDeleted,
        userLoggedOut
    } = useActions()

    const navigate = useNavigate()

    const urlParams = new URLSearchParams(window.location.search)
    const requestTokenURI = urlParams.get('request_token')

    useEffect(() => {
        console.log('requestToken - ', requestToken)
        console.log('tmdbAccount - ', tmdbAccount)
        console.log('sessionId - ', sessionId)
        console.log('validatedRequestToken - ', validatedRequestToken)
    }, [requestToken, tmdbAccount, sessionId, validatedRequestToken])

    useEffect(() => {
        !requestTokenURI &&
            requestTokenStored({
                request_token: requestTokenData?.request_token
            })
    }, [requestTokenData])

    const handleLogOut = () => {
        sessionBeenDeleted()
        userLoggedOut()
        watchListCleared()
        likeListCleared()
        requestTokenCleared()
        validatedTokenCleared()
        navigate('/movieholic/')
    }

    const handleSessionDeletion = async () => {
        await deleteSession(sessionId)

        sessionBeenDeleted()
        userLoggedOut()
        watchListCleared()
        likeListCleared()
        navigate('/movieholic/')
    }

    const handleSignUpFormOnClose = () => {
        setSignupFormClicked(false)
    }
    const handleLoginFormOnClose = () => {
        setLoginFormClicked(false)
    }

    const handleSignupFormOnClick = () => {
        setLoginFormClicked(false)
        setSignupFormClicked(true)
    }
    const handleLoginFormOnClick = () => {
        setSignupFormClicked(false)
        setLoginFormClicked(true)
    }

    const handleProfileClick = () => {
        setIsProfileClicked(!isProfileClicked)
    }

    return (
        <>
            <div className={styles.Header}>
                <div className="left flex items-center">
                    <CustomLink to="/movieholic/">
                        {window.window.innerWidth <= 1120 ? (
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
                    {tmdbAccount.username ? ( //TODO - Profile page with only avatar (not changeable) and username (not changeable), and sessionId (deleteable)
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
                                        <hr />
                                        <p className="text-ellipsis overflow-hidden">
                                            sessionId: {sessionId}
                                        </p>
                                        <hr />
                                        <p
                                            className="cursor-pointer"
                                            onClick={handleLogOut}
                                        >
                                            Log out of a session
                                        </p>
                                        <hr />
                                        <p
                                            className="cursor-pointer"
                                            onClick={handleSessionDeletion}
                                        >
                                            Delete the session
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
                                        {!tmdbAccount.avatar ? (
                                            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                                                <RotatingLines
                                                    strokeColor="grey"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="100"
                                                    visible={true}
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                src={`${tmdbApiConfig.w500Image(
                                                    tmdbAccount.avatar
                                                )}`}
                                                className="w-10 h-10 rounded-3xl"
                                                alt="Avatar"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.MobileTablet}>
                                <div className="flex relative items-center">
                                    <IoMdNotificationsOutline />
                                    <Link to="/movieholic/mobile-menu">
                                        <img
                                            src={`${tmdbApiConfig.w500Image(
                                                tmdbAccount.avatar
                                            )}`}
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
                                <div className={styles.Buttons}>
                                    <button
                                        className="border-gray-300 border-2 rounded-md transition-colors hover:bg-purple-900"
                                        onClick={handleSignupFormOnClick}
                                    >
                                        {!requestTokenURI && (
                                            <a
                                                href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://ilias-kadyrkulov.github.io/movieholic`}
                                            >
                                                Sign up
                                            </a>
                                        )}
                                        {!requestTokenURI ? (
                                            ''
                                        ) : (
                                            <span>Sign up</span>
                                        )}
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
                openLoginForm={handleLoginFormOnClick}
                requestTokenURI={requestTokenURI}
            />
            <LoginForm
                formClicked={loginFormClicked}
                closeForm={handleLoginFormOnClose}
                openSignupForm={handleSignupFormOnClick}
            />
        </>
    )
}

export default Header
