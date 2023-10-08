import { useState } from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/logo-low-resolution.png'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import 'firebase/auth'
import SignupForm from '../SignupForm/SignupForm'

const Header = () => {
    const [user, setUser] = useState(false)
    const [signupFormClicked, setSignupFormClicked] = useState(false)

    const handleSignUpFormOnBlur = () => {
        
    }

    return (
        <>
            <div className={styles.Header}>
                <div className="left">
                    <img className="w-46 h-12" src={logo} alt="Logo" />
                </div>
                <div className={styles.Center}>
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/discover">Discover</Link>
                    </div>
                    <div>
                        <Link to="/movie-release">Movie Release</Link>
                    </div>
                    <div>
                        <Link to="/forum">Forum</Link>
                    </div>
                    <div>
                        <Link to="/about">About</Link>
                    </div>
                </div>
                <div className={styles.Right}>
                    <div>
                        <AiOutlineSearch />
                    </div>
                    {user ? (
                        <div className="flex">
                            <img src="" alt="Notifications icon" />
                            <div>
                                <img src="" alt="Avatar" />
                                {user}
                            </div>
                        </div>
                    ) : (
                        <div className="flex">
                            <button
                                className="border-gray-300 border-2 rounded-md"
                                onClick={() => setSignupFormClicked(true)}
                            >
                                Sign up
                            </button>
                            <button className="border-green-700 border-2 rounded-md bg-green-700">
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <SignupForm formClicked={signupFormClicked} />
        </>
    )
}

export default Header
