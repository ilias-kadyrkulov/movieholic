import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './SmallSlider.module.scss'
import styled from 'styled-components'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import { MovieType } from '../../../types/types'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'
import { useAppSelector } from '../../../hooks/hooks'

type PropsType = {
  data: MovieType[] | undefined
}

const CustomStyles = styled.div``

const SmallSlider = (props: PropsType) => {
  const movieGenres = useAppSelector((state) => state.movieGenres)

  return (
    <CustomStyles>
      <Swiper
        className={styles.SmallSlider}
        slidesPerView={1.5}
        navigation
        breakpoints={{
          2000: {
            slidesPerView: 5.5,
          },
          1600: {
            slidesPerView: 4.5,
          },
          1250: {
            slidesPerView: 3.5,
          },
          950: {
            slidesPerView: 4.5,
          },
          768: {
            slidesPerView: 3.5,
          },
          475: {
            slidesPerView: 2.5,
          },
        }}
      >
        {props.data?.map((e, index) => (
          <SwiperSlide key={e.id}>
            <Link to={`title/movie/${e.id}`}>
              {e.poster_path && (
                <div className={styles.MovieCard}>
                  <div className={styles.Number}>{index + 1}</div>
                  <img src={tmdbApiConfig.w500Image(e.poster_path)} />
                  <div className={styles.MovieDetails}>
                    <h2 className="font-medium text-sm text-white mt-2 h-10">
                      {e.title}
                    </h2>

                    <div className={styles.Rating}>
                      <AiFillStar />
                      <div className="font-semibold text-sm mx-2 text-white">
                        {e.vote_average}
                      </div>
                      <div className="relative">
                        <div className={styles.TitleType}>Movie</div>
                      </div>
                    </div>
                    <div className={styles.Genres}>
                      <div>
                        <LiaFilmSolid />
                      </div>
                      <div className="leading-3 w-3/4 text-center">
                        {movieGenres && e.genre_ids.map((g) => (
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

export default SmallSlider
