import React, { useState, useEffect, createContext, Suspense } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import PrimaryLayout from './layouts/PrimaryLayout/PrimaryLayout'
import HomePage from './screens/HomePage/HomePage'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import LoginForm from './components/Forms/LoginForm/LoginForm'
import SignupForm from './components/Forms/SignupForm/SignupForm'
import { RotatingLines } from 'react-loader-spinner'

const MoviePage = React.lazy(() => import('./components/MoviePage/MoviePage'))
const MoviePlayer = React.lazy(
    () => import('./components/Players/MoviePlayer/MoviePlayer')
)
const TVSeriesPlayer = React.lazy(
    () => import('./components/Players/TVSeriesPlayer/TVSeriesPlayer')
)
const TrailerPlayer = React.lazy(
    () => import('./components/Players/TrailerPlayer/TrailerPlayer')
)
const SecondaryLayout = React.lazy(
    () => import('./layouts/SecondaryLayout/SecondaryLayout')
)
const DiscoverPage = React.lazy(
    () => import('./screens/DiscoverPage/DiscoverPage')
)
const MovieReleasePage = React.lazy(
    () => import('./screens/MovieReleasePage/MovieReleasePage')
)
const ForumPage = React.lazy(() => import('./screens/ForumPage/ForumPage'))
const AboutPage = React.lazy(() => import('./screens/AboutPage/AboutPage'))
const NotFoundPage = React.lazy(
    () => import('./screens/NotFoundPage/NotFoundPage')
)
const MobileMenuLayout = React.lazy(
    () => import('./layouts/MobileMenuLayout/MobileMenuLayout')
)
const MobileMenuPage = React.lazy(
    () => import('./screens/MobileMenuPage/MobileMenuPage')
)

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
        <Suspense
            fallback={
                <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="100"
                        visible={true}
                    />
                </div>
            }
        >
            <UserContext.Provider value={authUser}>
                <Router>
                    <Routes>
                        <Route path="/" element={<PrimaryLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="discover" element={<DiscoverPage />} />
                            <Route path="about" element={<AboutPage />} />
                        </Route>
                        <Route path="/" element={<SecondaryLayout />}>
                            <Route
                                path="movie-release"
                                element={<MovieReleasePage />}
                            />
                            <Route path="forum" element={<ForumPage />} />
                            <Route
                                path="title/movie/:id"
                                element={<MoviePage />}
                            />
                            <Route
                                path="title/tvSeries/:id/:titleText/:ep"
                                element={<TVSeriesPlayer />}
                            />
                            <Route
                                path="title/movie/:id/:titleText"
                                element={<MoviePlayer />}
                            />
                            <Route
                                path="trailer/:id"
                                element={<TrailerPlayer />}
                            />
                        </Route>
                        <Route
                            path="mobile-menu"
                            element={<MobileMenuLayout />}
                        >
                            <Route index element={<MobileMenuPage />} />
                            <Route path="login" element={<LoginForm />} />
                            <Route path="sign-up" element={<SignupForm />} />
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Router>
            </UserContext.Provider>
        </Suspense>
    )
}

export default App
