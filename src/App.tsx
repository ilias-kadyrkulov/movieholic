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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrimaryLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="discover" element={<DiscoverPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route element={<SecondaryLayout />}>
                    <Route
                        path="movie-release"
                        element={<MovieReleasePage />}
                    />
                    <Route path="forum" element={<ForumPage />} />
                    <Route path="titles/:id?" element={<ShowPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
