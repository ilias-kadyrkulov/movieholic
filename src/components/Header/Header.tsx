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
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  useCreateRequestTokenQuery,
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useLazyGetAccountDetailsQuery,
  // usePrefetch
} from '../../api/tmdbV3/auth.api'
import { useAppSelector } from '../../hooks/hooks'
import { tmdbApiConfig } from '../../api/tmdbV3/tmdb.api'
import { RotatingLines } from 'react-loader-spinner'
import SearchInput from '../../common/SearchInput/SearchInput'

const Header = () => {
  const { data: requestTokenData } = useCreateRequestTokenQuery()
  const [deleteSession] = useDeleteSessionMutation()
  const [getAccountDetails] = useLazyGetAccountDetailsQuery()
  const [createSession] = useCreateSessionMutation()
  // const prefetchRequestToken = usePrefetch('createRequestToken')

  const [signupFormClicked, setSignupFormClicked] = useState(false)
  const [loginFormClicked, setLoginFormClicked] = useState(false)
  const [isProfileClicked, setIsProfileClicked] = useState(false)
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [IsViewportWidthMoreThan1120, setIsViewportWidthMoreThan1120] = useState<boolean | null>(
    null,
  )

  const tmdbAccount = useAppSelector((state) => state.tmdbAccount)
  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)
  const requestToken = useAppSelector((state) => state.tmdbSession.requestToken)
  const validatedRequestToken = useAppSelector((state) => state.tmdbSession.validatedToken)

  useEffect(() => {
    const handleResize = () => {
      setIsViewportWidthMoreThan1120(window.innerWidth > 1120)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [IsViewportWidthMoreThan1120, window.window.innerWidth])

  const {
    movieWatchlistCleared,
    likeListCleared,
    requestTokenStored,
    requestTokenCleared,
    validatedTokenCleared,
    sessionBeenDeleted,
    userLoggedOut,
    movieGenresCleared,
    movieFavoriteCleared,
    sessionBeenStored,
    userLoggedIn,
    functionShouldRun,
  } = useActions()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const urlParams = new URLSearchParams(window.location.search)
  const requestTokenURI = urlParams.get('request_token')

  const handleSessionCreation = async () => {
    const result = await createSession(validatedRequestToken).unwrap()
    sessionBeenStored({ session_id: result.session_id })
    functionShouldRun()
  }

  const handleAccountDetails = async () => {
    const result = await getAccountDetails(sessionId).unwrap()
    userLoggedIn({
      username: result.username,
      avatar: result.avatar,
      iso_639_1: result.iso_639_1,
      iso_3166_1: result.iso_3166_1,
    })
  }

  const handleLogOut = () => {
    sessionBeenDeleted()
    userLoggedOut()
    movieWatchlistCleared()
    likeListCleared()
    requestTokenCleared()
    validatedTokenCleared()
    movieGenresCleared()
    movieFavoriteCleared()
    navigate('/')
  }

  const handleSessionDeletion = async () => {
    await deleteSession(sessionId)

    handleLogOut()
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

  const handleSearchClick = () => {
    setIsSearchClicked(!isSearchClicked)
  }

  useEffect(() => {
    sessionId && handleAccountDetails()
  }, [sessionId])

  useEffect(() => {
    validatedRequestToken && handleSessionCreation()
  }, [validatedRequestToken])

  useEffect(() => {
    console.log('requestToken - ', requestToken)
    console.log('tmdbAccount - ', tmdbAccount)
    console.log('sessionId - ', sessionId)
    console.log('validatedRequestToken - ', validatedRequestToken)
  }, [requestToken, tmdbAccount, sessionId, validatedRequestToken])

  useEffect(() => {
    !requestTokenURI &&
      requestTokenStored({
        request_token: requestTokenData?.request_token,
      })
  }, [requestTokenData])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {isSearchClicked && <SearchInput handleSearchClick={handleSearchClick} />}
      <div className={styles.Header}>
        <div className="left flex items-center">
          <CustomLink to="/">
            {IsViewportWidthMoreThan1120 ? (
              <img className="w-40 h-10" src={logo} alt="Logo" />
            ) : (
              <img className="w-10 h-12" src={smallLogo} alt="Logo" />
            )}
          </CustomLink>
        </div>
        <div className={styles.Center}>
          <PagesList />
        </div>
        <div className={styles.Right}>
          <div className="flex items-center justify-center">
            <AiOutlineSearch onClick={handleSearchClick} />
          </div>
          {tmdbAccount.username ? ( //TODO - Profile page with only avatar (not changeable) and username (not changeable), and sessionId (deleteable)
            <>
              <div className={styles.Laptop}>
                <div className="flex relative items-center">
                  <div className={isProfileClicked ? styles.ProfileActive : styles.Profile}>
                    <p className="cursor-pointer">Profile</p>
                    <hr />
                    <p className="text-ellipsis overflow-hidden">sessionId: {sessionId}</p>
                    <hr />
                    <p className="cursor-pointer" onClick={handleLogOut}>
                      Log out of a session
                    </p>
                    <hr />
                    <p className="cursor-pointer" onClick={handleSessionDeletion}>
                      Delete the session
                    </p>
                  </div>
                  <IoMdNotificationsOutline />
                  <div
                    className={isProfileClicked ? styles.AvatarActive : styles.Avatar}
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
                        src={`${tmdbApiConfig.w500Image(tmdbAccount.avatar)}`}
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
                  <Link to="mobile-menu">
                    <img
                      src={`${tmdbApiConfig.w500Image(tmdbAccount.avatar)}`}
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
                        href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://movieholic-ik.netlify.app`}
                      >
                        Sign up
                      </a>
                    )}
                    {!requestTokenURI ? '' : <span>Sign up</span>}
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
