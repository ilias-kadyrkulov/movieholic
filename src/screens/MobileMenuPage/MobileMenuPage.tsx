import { useEffect } from 'react'
import styles from './MobileMenuPage.module.scss'
import PagesList from '../../components/PagesList/PagesList'
import CustomLink from '../../common/CustomLink/CustomLink'
import { useActions } from '../../hooks/useActions'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { useCreateRequestTokenQuery } from '../../api/tmdbV3/auth.api'

const MobileMenuPage = () => {
    const { data: requestTokenData } = useCreateRequestTokenQuery()

    const tmdbAccount = useAppSelector((state) => state.tmdbAccount)
    const requestToken = useAppSelector(
        (state) => state.tmdbSession.requestToken
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
        navigate('/')
    }

    return (
        <div className={styles.Body}>
            <div
                className={
                    tmdbAccount.username ? styles.UserLoggedIn : styles.Buttons
                }
            >
                {tmdbAccount.username ? (
                    <>
                        <button
                            className="border-green-700 bg-green-700 hover:opacity-90"
                            onClick={() => {}}
                        >
                            Change profile
                        </button>
                        <button
                            className="border-gray-300 transition-colors hover:bg-purple-900"
                            onClick={handleLogOut}
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <button className="border-gray-300 transition-colors hover:bg-purple-900">
                            <a
                                href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://stately-moonbeam-5d3b0c.netlify.app/mobile-menu/sign-up`}
                            >
                                Sign up
                            </a>
                        </button>

                        <CustomLink to="login">
                            <button className="border-green-700 bg-green-700 hover:opacity-90">
                                Login
                            </button>
                        </CustomLink>
                    </>
                )}
            </div>

            <div>
                <hr className="mt-5" />
                <PagesList />
            </div>
        </div>
    )
}

export default MobileMenuPage
