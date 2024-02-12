import React from 'react'
import PrimaryLayout from '../layouts/PrimaryLayout/PrimaryLayout'
import HomePage from '../screens/HomePage/HomePage'
import LoginForm from '../components/Forms/LoginForm/LoginForm'
import SignupForm from '../components/Forms/SignupForm/SignupForm'

const MoviePage = React.lazy(() => import('@/components/MoviePage/MoviePage'))
const SeriesPage = React.lazy(() => import('@/components/SeriesPage/SeriesPage'))
const MoviePlayer = React.lazy(() => import('@/components/Players/MoviePlayer/MoviePlayer'))
const TVSeriesPlayer = React.lazy(
  () => import('@/components/Players/TVSeriesPlayer/TVSeriesPlayer'),
)
const TrailerPlayer = React.lazy(() => import('@/components/Players/TrailerPlayer/TrailerPlayer'))
const SecondaryLayout = React.lazy(() => import('@/layouts/SecondaryLayout/SecondaryLayout'))
const DiscoverPage = React.lazy(() => import('@/screens/DiscoverPage/DiscoverPage'))
const MovieReleasePage = React.lazy(() => import('@/screens/MovieReleasePage/MovieReleasePage'))
const ForumPage = React.lazy(() => import('@/screens/ForumPage/ForumPage'))
const AboutPage = React.lazy(() => import('@/screens/AboutPage/AboutPage'))
const NotFoundPage = React.lazy(() => import('@/screens/NotFoundPage/NotFoundPage'))
const MobileMenuLayout = React.lazy(() => import('@/layouts/MobileMenuLayout/MobileMenuLayout'))
const MobileMenuPage = React.lazy(() => import('@/screens/MobileMenuPage/MobileMenuPage'))

type Route = {
  path: string
  element: JSX.Element
  children?: Route[]
}

export const routes: Route[] = [
  {
    path: '/',
    element: <PrimaryLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
  {
    path: '/',
    element: <SecondaryLayout />,
    children: [
      { path: 'movie-release', element: <MovieReleasePage /> },
      { path: 'forum', element: <ForumPage /> },
      { path: 'title/movie/:id', element: <MoviePage /> },
      { path: 'title/tvSeries/:id', element: <SeriesPage /> },
      {
        path: 'title/tvSeries/:id/:titleText/season/:seasonNumber/:ep',
        element: <TVSeriesPlayer />,
      },
      { path: 'title/movie/:id/:titleText', element: <MoviePlayer /> },
      { path: 'trailer/:id', element: <TrailerPlayer /> },
    ],
  },
  {
    path: '/mobile-menu',
    element: <MobileMenuLayout />,
    children: [
      { path: '', element: <MobileMenuPage /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'sign-up', element: <SignupForm /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]
