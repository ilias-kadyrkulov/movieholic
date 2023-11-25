import { useEffect } from 'react'
import styles from './BigSlider.module.scss'
import styled from 'styled-components'
import { TopRatedSeriesEntryType } from '../../../api/show/titles.api'
import GreenButton from '../../../common/Buttons/GreenButton/GreenButton'
import MovieWatchlistButton from '../../../common/Buttons/MovieWatchlistButton/MovieWatchlistButton'
import { useAppSelector } from '../../../hooks/hooks'
import WatchTrailerButton from '../../../common/Buttons/WatchTraillerButton/WatchTrailerButton'
import { GetNowPlayingMoviesType } from '../../../api/tmdbV3/movieLists.api'
import { useGetMovieGenresQuery } from '../../../api/tmdbV3/genres.api'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import { useActions } from '../../../hooks/useActions'

SwiperCore.use([Navigation, Autoplay, Pagination])

type PropsType = {
  topRatedSeries: TopRatedSeriesEntryType[] | undefined
  nowPlayingMovies: GetNowPlayingMoviesType | undefined
}

const CustomStyles = styled.div`
  .swiper {
    width: 100%;
    height: 850px;
  }

  .swiper-pagination-bullet {
    background: #fff;
    width: 10px;
    height: 10px;
  }

  .swiper-horizontal {
    .swiper-pagination-bullet {
      margin: 0 10px;
    }
  }

  @media (min-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 0;
    }
  }
  @media (min-width: 1600px) {
    .swiper-pagination {
      text-align: right;
    }

    .swiper-pagination-bullet {
      background: #fff;
      width: 10px;
      height: 10px;
    }

    .swiper-pagination-bullets.swiper-pagination-horizontal {
      left: unset;
      right: 50px;
      bottom: 50px;
    }
  }

  @media (max-width: 768px) {
    .swiper-pagination-bullets.swiper-pagination-horizontal {
      bottom: 2px;
    }
  }
  @media (max-width: 768px) {
    .swiper-horizontal {
      .swiper-pagination-bullet {
        margin: 0 5px;
      }
    }
  }
  @media (max-width: 400px) {
    .swiper-horizontal {
      .swiper-pagination-bullet {
        margin: 0 3px;
      }
    }
  }
`

export const BigSlider = (props: PropsType) => {
  const { data: movieGenresData } = useGetMovieGenresQuery()

  const { movieGenresReceived } = useActions()

  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const movieGenres = useAppSelector((state) => state.movieGenres)
  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)

  const genreObj = movieGenresData?.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name
    return acc
  }, {} as Record<number, string>)

  useEffect(() => {
    movieGenresData && movieGenresReceived(genreObj)
  }, [movieGenresData])

  return (
    <>
      <CustomStyles>
        <Swiper
          className={styles.Carousel}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5000 }}
          pagination
        >
          {props.nowPlayingMovies?.results.map((m) => (
            <SwiperSlide key={m.id}>
              <div className={styles.Slide}>
                <div
                  className={`bg-cover bg-no-repeat bg-center h-full`}
                  style={{
                    backgroundImage: `url(${tmdbApiConfig.originalImage(m.poster_path)})`,
                  }}
                >
                  <div className={styles.Details}>
                    <h3 className="text-2xl text-slate-200 font-semibold">{m.original_title}</h3>
                    <div>
                      <span className="font-semibold text-slate-400">{m.release_date} • </span>
                      {movieGenres &&
                        m.genre_ids.map((genreId) => (
                          <span key={genreId} className="font-semibold text-slate-400 mr-1">
                            {movieGenres[genreId]}
                          </span>
                        ))}
                    </div>
                    <p
                      className="font-medium text-gray-300 text-sm"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '3',
                        overflow: 'hidden',
                      }}
                    >
                      {m.overview}
                    </p>
                    <div className={styles.Buttons}>
                      <GreenButton text="Watch" tmdbId={m.id} />
                      <WatchTrailerButton tmdbId={m.id} text="Watch Trailer" />
                      {movieWatchlist.find((item) => m.id === item.id) ? (
                        <MovieWatchlistButton text="Remove from Watchlist" tmdbId={m.id} />
                      ) : (
                        <MovieWatchlistButton text="Add to Watchlist" tmdbId={m.id} tmdbAcc={tmdbAccount} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </CustomStyles>
    </>
  )
}
