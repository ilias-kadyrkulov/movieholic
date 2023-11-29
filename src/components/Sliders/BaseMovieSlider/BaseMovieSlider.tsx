import { Link } from 'react-router-dom'
import styles from './BaseMovieSlider.module.scss'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MovieType } from '../../../types/types'
import { useAppSelector } from '../../../hooks/hooks'
import { AiFillStar } from 'react-icons/ai'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'

type PropsType = {
  data: MovieType[]
}

const CustomStyles = styled.div``

const BaseMovieSlider = ({ data }: PropsType) => {
  const movieGenres = useAppSelector((state) => state.movieGenres)

  return (
    <CustomStyles>
      <Swiper
        className={styles.BaseMovieSlider}
        spaceBetween={20}
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
        {data?.map((m) => (
          <SwiperSlide key={m.id}>
            <Link to={`title/movie/${m.id}`}>
              {m.poster_path && (
                <div
                  className={styles.ShowCard}
                >
                  <img src={tmdbApiConfig.w500Image(m.backdrop_path)} />
                  <h2 className={styles.Title}>{m.title}</h2>
                  <div className={styles.MovieDetails}>
                    <div className={styles.Rating}>
                      <AiFillStar />
                      <div className="font-semibold text-sm mx-2 text-white">{m.vote_average}</div>
                    </div>
                    <div className={styles.Genres}>
                        {movieGenres &&
                          m.genre_ids.map((g) => <span key={g}>{movieGenres[g]}</span>)}
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

export default BaseMovieSlider
