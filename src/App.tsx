import { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import PrimaryLayout from './layouts/PrimaryLayout/PrimaryLayout'
import SecondaryLayout from './layouts/SecondaryLayout/SecondaryLayout'
import HomePage from './screens/HomePage/HomePage'
import DiscoverPage from './screens/DiscoverPage/DiscoverPage'
import MovieReleasePage from './screens/MovieReleasePage/MovieReleasePage'
import ForumPage from './screens/ForumPage/ForumPage'
import AboutPage from './screens/AboutPage/AboutPage'
import NotFoundPage from './screens/NotFoundPage/NotFoundPage'
import ShowPage from './components/ShowPage/ShowPage'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import MobileMenuPage from './screens/MobileMenuPage/MobileMenuPage'
import TVSeriesPlayer from './components/Players/TVSeriesPlayer/TVSeriesPlayer'
import MoviePlayer from './components/Players/MoviePlayer/MoviePlayer'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import MobileMenuLayout from './layouts/MobileMenuLayout/MobileMenuLayout'

export const UserContext = createContext<User | null>(null)

function App() {
    const [authUser, setAuthUser] = useState<User | null>(null)

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

    return (
        <UserContext.Provider value={authUser}>
            <Router>
                <Routes>
                    <Route path="/movieholic/" element={<PrimaryLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/movieholic/discover" element={<DiscoverPage />} />
                        <Route path="/movieholic/about" element={<AboutPage />} />
                        <Route path="/movieholic/*" element={<NotFoundPage />} />
                    </Route>
                    <Route element={<SecondaryLayout />}>
                        <Route
                            path="/movieholic/movie-release"
                            element={<MovieReleasePage />}
                        />
                        <Route path="/movieholic/forum" element={<ForumPage />} />
                        <Route path="/movieholic/title/:id" element={<ShowPage />} />
                        <Route
                            path="/movieholic/title/:id/tvSeries/:titleText/:ep"
                            element={<TVSeriesPlayer />}
                        />
                        <Route
                            path="/movieholic/title/:id/movies/:titleText"
                            element={<MoviePlayer />}
                        />
                    </Route>
                    <Route path='/movieholic/mobile-menu' element={<MobileMenuLayout />}>
                        <Route index element={<MobileMenuPage />} />
                        <Route path='login' element={<LoginForm />} />
                        <Route path='sign-up' element={<SignupForm />} />
                    </Route>
                </Routes>
            </Router>
        </UserContext.Provider>
    )
}

export default App
