import { useEffect, useState } from 'react'
import { useGetTrendingMoviesQuery } from '@/api/tmdbV3/trending.api'
import TrendingTodaySlider from '@/components/Sliders/TrendingTodaySlider/TrendingTodaySlider'
import styles from './TrendingToday.module.scss'
import { useAppSelector } from '@/hooks/hooks'
import { tmdbApiConfig } from '@/api/tmdbV3/tmdb.api'
import { AiFillStar } from 'react-icons/ai'
import PlayContinueButton from '@/common/Buttons/PlayContinueButton/PlayContinueButton'
import WatchlistButton from '@/common/Buttons/WatchlistButton/WatchlistButton'
import { useLazyGetMovieDetailsByMovieIdQuery } from '@/api/tmdbV3/movies.api'

const TrendingToday = () => {
  const { data: trendingMoviesData } = useGetTrendingMoviesQuery({
    time_window: 'day',
  })
  const [getMovieDetails, { data: movieDetailsData }] = useLazyGetMovieDetailsByMovieIdQuery()

  const [popularity, setPopularity] = useState(1)

  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)
  const movieGenres = useAppSelector((state) => state.movieGenres)
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const country = useAppSelector((state) => state.tmdbAccount.country)

  useEffect(() => {
    trendingMoviesData && getMovieDetails({ movieId: trendingMoviesData?.results[0].id })
  }, [trendingMoviesData])

  return (
    <div className={styles.TrendingToday}>
      <div className={styles.Featured}>
        <h2 className="text-slate-100 font-semibold text-4xl mb-3">Featured in Movieholic</h2>
        <h5 className="text-slate-300 font-normal text-xl">Best featured for you today</h5>
      </div>
      <h5 className={styles.Popularity}>
        #{popularity} in {country ? country : 'KG'}
      </h5>

      <div className={styles.Slide}>
        <div
          className={`bg-cover bg-no-repeat bg-center h-full`}
          style={{
            backgroundImage: `url(${tmdbApiConfig.originalImage(movieDetailsData?.backdrop_path)})`,
          }}
        >
          <div className={styles.Details}>
            <h3 className={styles.Title}>{movieDetailsData?.title}</h3>
            <div className="my-3">
              <AiFillStar />
              <span className="font-semibold text-slate-200">{movieDetailsData?.vote_average}</span>
              <span className="font-semibold text-slate-400">
                {' '}
                • {movieDetailsData?.release_date} •{' '}
              </span>
              {movieGenres &&
                movieDetailsData?.genres.map((genreId) => (
                  <span key={genreId.id} className={styles.Genres}>
                    {movieGenres[genreId.id]}
                  </span>
                ))}
            </div>
            <p
              className={styles.Overview}
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '3',
                overflow: 'hidden',
              }}
            >
              {movieDetailsData?.overview}
            </p>
            <div className={styles.Buttons}>
              <PlayContinueButton
                text="Play now"
                titleText={movieDetailsData?.title}
                titleType="movie"
                tmdbId={movieDetailsData?.id}
              />
              {movieWatchlist.find((item) => movieDetailsData?.id === item) ? (
                <WatchlistButton
                  text="Remove from Watchlist"
                  tmdbId={movieDetailsData?.id}
                  titleType="movie"
                />
              ) : (
                <WatchlistButton
                  text="Add to Watchlist"
                  tmdbId={movieDetailsData?.id}
                  tmdbAcc={tmdbAccount}
                  titleType="movie"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TrendingTodaySlider
        data={trendingMoviesData?.results}
        getMovieDetails={getMovieDetails}
        setPopularity={setPopularity}
      />
    </div>
  )
}

export default TrendingToday
