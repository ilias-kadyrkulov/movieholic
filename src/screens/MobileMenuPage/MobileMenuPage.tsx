import styles from './MobileMenuPage.module.scss'
import PagesList from '../../components/PagesList/PagesList'
import CustomLink from '../../common/CustomLink/CustomLink'
import { useActions } from '../../hooks/useActions'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { useLazyCreateRequestTokenQuery } from '../../api/tmdbV3/auth.api'

const MobileMenuPage = () => {
    const [createRequestToken] = useLazyCreateRequestTokenQuery()

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

    const handleTokenCreation = async () => {
        const result = await createRequestToken().unwrap()
        requestTokenStored({ request_token: result.request_token })
    }

    const handleLogOut = () => {
        sessionBeenDeleted()
        userLoggedOut()
        watchListCleared()
        likeListCleared()
        requestTokenCleared()
        validatedTokenCleared()
        navigate('/movieholic/')
    }

    return (
        <div className={styles.Body}>
            <div className={tmdbAccount.username ? styles.UserLoggedIn : styles.Buttons}>
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
                        <button className="border-gray-300 transition-colors hover:bg-purple-900" onClick={handleTokenCreation}>
                            Request new token
                        </button>
                        <button className="border-gray-300 transition-colors hover:bg-purple-900">
                            <a
                                href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://127.0.0.1:5173/movieholic/mobile-menu/sign-up`}
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
