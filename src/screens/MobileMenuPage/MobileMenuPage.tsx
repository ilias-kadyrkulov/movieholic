import styles from './MobileMenuPage.module.scss'
import PagesList from '../../components/PagesList/PagesList'
import { useContext } from 'react'
import { UserContext } from '../../App'
import CustomLink from '../../common/CustomLink/CustomLink'
import { useActions } from '../../hooks/useActions'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

const MobileMenuPage = () => {
    const user = useContext(UserContext)

    const { watchListCleared, showListCleared } = useActions()

    const handleSignOut = () => {
        signOut(auth)
        watchListCleared()
        showListCleared()
    }

    return (
        <div className={styles.Body}>
            <div className={styles.Buttons}>
                {user ? (
                    <>
                        <button
                            className="border-green-700 bg-green-700 hover:opacity-90"
                            onClick={() => {}}
                        >
                            Change profile
                        </button>
                        <button
                            className="border-gray-300 transition-colors hover:bg-purple-900"
                            onClick={handleSignOut}
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <CustomLink to="sign-up">
                            <button className="border-gray-300 transition-colors hover:bg-purple-900 mr-6">
                                Sign up
                            </button>
                        </CustomLink>
                        <CustomLink to="login">
                            <button className="border-green-700 bg-green-700 hover:opacity-90 ml-6">
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
