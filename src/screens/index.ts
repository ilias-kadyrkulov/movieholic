import React from 'react'
export { default as PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
export { default as HomePage } from '@/screens/HomePage/HomePage'
export { default as LoginForm } from '@/components/Forms/LoginForm/LoginForm'
export { default as SignupForm } from '@/components/Forms/SignupForm/SignupForm'

export const MoviePage = React.lazy(() => import('@/components/MoviePage/MoviePage'))
export const SeriesPage = React.lazy(() => import('@/components/SeriesPage/SeriesPage'))
export const MoviePlayer = React.lazy(() => import('@/components/Players/MoviePlayer/MoviePlayer'))
export const TVSeriesPlayer = React.lazy(
  () => import('@/components/Players/TVSeriesPlayer/TVSeriesPlayer'),
)
export const TrailerPlayer = React.lazy(
  () => import('@/components/Players/TrailerPlayer/TrailerPlayer'),
)
export const SecondaryLayout = React.lazy(() => import('@/layouts/SecondaryLayout/SecondaryLayout'))
export const DiscoverPage = React.lazy(() => import('@/screens/DiscoverPage/DiscoverPage'))
export const MovieReleasePage = React.lazy(
  () => import('@/screens/MovieReleasePage/MovieReleasePage'),
)
export const ForumPage = React.lazy(() => import('@/screens/ForumPage/ForumPage'))
export const AboutPage = React.lazy(() => import('@/screens/AboutPage/AboutPage'))
export const NotFoundPage = React.lazy(() => import('@/screens/NotFoundPage/NotFoundPage'))
export const MobileMenuLayout = React.lazy(
  () => import('@/layouts/MobileMenuLayout/MobileMenuLayout'),
)
export const MobileMenuPage = React.lazy(() => import('@/screens/MobileMenuPage/MobileMenuPage'))
