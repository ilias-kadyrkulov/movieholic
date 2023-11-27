import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './MovieWatchlistSlider.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGetMoviesWatchlistQuery } from '../../../api/tmdbV3/account.api'
import { useAppSelector } from '../../../hooks/hooks'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'
import { useEffect } from 'react'
import { useActions } from '../../../hooks/useActions'

const CustomStyles = styled.div`
  @media (max-width: 768px) {
    .swiper-slide {
      display: flex;
      justify-content: center;
    }
  }
`

const MovieWatchlistSlider = () => {
  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const movieGenres = useAppSelector((state) => state.movieGenres)

  const { movieWatchlistReceived, movieWatchlistCleared } = useActions()

  const { data: movieWatchlistData } = useGetMoviesWatchlistQuery({
    session_id: sessionId,
  })

  useEffect(() => {
    movieWatchlistCleared() //TODO - May be optimized? Unnecessary state cleaning?
  }, [])

  useEffect(() => {
    movieWatchlistData && movieWatchlistReceived(movieWatchlistData.results)
  }, [movieWatchlistData])

  return (
    <CustomStyles>
      <Swiper
        className={styles.MovieWatchlistSlider}
        navigation
        breakpoints={{
          1800: {
            slidesPerView: 5,
          },
          1400: {
            slidesPerView: 4,
          },
          1100: {
            slidesPerView: 3,
          },
          475: {
            slidesPerView: 2,
          },
        }}
      >
        {movieWatchlist?.map((m) => (
          <SwiperSlide key={m.id}>
            <Link to={`title/movie/${m.id}`}>
              {m.poster_path && (
                <div className={styles.MovieCard}>
                  <img src={tmdbApiConfig.w500Image(m.poster_path)} />
                  <div className={styles.MovieDetails}>
                    <h2 className="font-semibold text-base text-white">{m.title}</h2>

                    <div className={styles.Rating}>
                      <AiFillStar />
                      <div className="font-semibold text-lg mx-2 text-white">{m.vote_average}</div>
                      <div className="relative">
                        <div className={styles.TitleType}>Movie</div>
                      </div>
                    </div>
                    <div className={styles.Genres}>
                      <div className="pr-1">
                        <LiaFilmSolid />
                      </div>
                      <div className="leading-3 w-full">
                        {movieGenres &&
                          m.genre_ids.map((g) => (
                            <span key={g}>
                              {movieGenres[g]}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomStyles>
  )
}

export default MovieWatchlistSlider
