import styles from './BigSlider.module.scss'
import styled from 'styled-components'
import GreenButton from '../../../common/Buttons/GreenButton/GreenButton'
import WatchlistButton from '../../../common/Buttons/WatchlistButton/WatchlistButton'
import { useAppSelector } from '../../../hooks/hooks'
import WatchTrailerButton from '../../../common/Buttons/WatchTrailerButton/WatchTrailerButton'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import { NowPlayingMovieType } from '../../../types/types'

SwiperCore.use([Navigation, Autoplay, Pagination])

type PropsType = {
  data: NowPlayingMovieType[] | undefined
}

const CustomStyles = styled.div`
  .swiper {
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

  @media (max-width: 768px) {
    .swiper {
      height: 600px;
    }

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
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const movieGenres = useAppSelector((state) => state.movieGenres)
  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)

  return (
    <>
      <CustomStyles>
        <Swiper
          className={styles.BigSlider}
          slidesPerView={1}
          autoplay={{ delay: 7000 }}
          pagination={
            {clickable: true}
          }
        >
          {props.data?.map((m) => (
            <SwiperSlide key={m.id}>
              <div className={styles.Slide}>
                <div
                  className={`bg-cover bg-no-repeat bg-center h-full`}
                  style={{
                    backgroundImage: `url(${tmdbApiConfig.originalImage(m.backdrop_path)})`,
                  }}
                >
                  <div className={styles.Details}>
                    <h3 className="text-2xl text-slate-200 font-semibold">{m.title}</h3>
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
                        <WatchlistButton text="Remove from Watchlist" tmdbId={m.id} titleType='movie' />
                      ) : (
                        <WatchlistButton text="Add to Watchlist" tmdbId={m.id} tmdbAcc={tmdbAccount} titleType='movie' />
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
