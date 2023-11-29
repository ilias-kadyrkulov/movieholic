import styles from './TrendingTodaySlider.module.scss'
import { useAppSelector } from '../../../hooks/hooks'
import { MovieDetailsRequestType, MovieType } from '../../../types/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'
import { AiFillStar } from 'react-icons/ai'
import styled from 'styled-components'

type PropsType = {
  data: MovieType[] | undefined
  getMovieDetails: (movieId: MovieDetailsRequestType) => void
  setPopularity: (index: number) => void
}

const CustomStyles = styled.div`
  // .swiper-button-next {
  //   right: unset;
  //   left: 80dvw;
  // }
`

const TrendingTodaySlider = ({ data, getMovieDetails, setPopularity }: PropsType) => {
  const movieGenres = useAppSelector((state) => state.movieGenres)

  return (
    <CustomStyles>
      <Swiper
        className={styles.TrendingTodaySlider}
        slidesPerView={2}
        spaceBetween={20}
        navigation
        breakpoints={{
          2400: {
            slidesPerView: 5,
          },
          2000: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 3,
          }
        }}
      >
        {data?.map((m, index) => (
          <SwiperSlide
            className="rounded-2xl"
            key={m.id}
            onClick={() => {
              getMovieDetails({ movieId: m.id })
              setPopularity(index + 1)
            }}
          >
            {m.backdrop_path && (
              <div className={styles.MovieCard}>
                <img src={tmdbApiConfig.originalImage(m.poster_path)} />
                <div className={styles.MovieDetails}>
                  <h2 className="font-semibold text-base text-white mb-1">{m.title}</h2>
                  <div className="flex max-w-full">
                    <div className="flex items-center">
                      <AiFillStar />
                      <div className="font-semibold text-xs mx-2 text-white">{m.vote_average}</div>
                    </div>
                    <div className="relative flex max-w-full w-10/12">
                      <div className={styles.Genres}>
                        {movieGenres &&
                          m.genre_ids.map((g) => (
                            <span
                              className="inline-block font-semibold text-xs text-slate-400 mr-1"
                              key={g}
                            >
                              {movieGenres[g]}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomStyles>
  )
}

export default TrendingTodaySlider
