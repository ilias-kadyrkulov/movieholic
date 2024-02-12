import {
  AboutPage,
  DiscoverPage,
  ForumPage,
  HomePage,
  LoginForm,
  MobileMenuLayout,
  MobileMenuPage,
  MoviePage,
  MoviePlayer,
  MovieReleasePage,
  NotFoundPage,
  PrimaryLayout,
  SecondaryLayout,
  SeriesPage,
  SignupForm,
  TVSeriesPlayer,
  TrailerPlayer,
} from '@/screens'

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
