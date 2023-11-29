import { Link } from 'react-router-dom'
import styles from '../BaseMovieSlider/BaseMovieSlider.module.scss'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { TVType } from '../../../types/types'
import { useAppSelector } from '../../../hooks/hooks'
import { AiFillStar } from 'react-icons/ai'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'

type PropsType = {
  data: TVType[]
}

const CustomStyles = styled.div`
`

const BaseTVSlider = ({ data }: PropsType) => {
  const tvGenres = useAppSelector((state) => state.tvGenres)

  return (
    <CustomStyles>
      <Swiper
        className={styles.BaseTVSlider}
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
        {data.map((m) => (
          <SwiperSlide key={m.id}>
            <Link to={`title/tvSeries/${m.id}`}>
              {m.poster_path && (
                <div className={styles.ShowCard}>
                  <img src={tmdbApiConfig.originalImage(m.backdrop_path)} />
                  <h2 className={styles.Title}>{m.name}</h2>
                  <div className={styles.MovieDetails}>
                    <div className={styles.Rating}>
                      <AiFillStar />
                      <div className="font-semibold text-sm mx-2 text-white">{m.vote_average}</div>
                    </div>
                    <div className={styles.Genres}>
                      {tvGenres && m.genre_ids.map((g) => <span key={g}>• {tvGenres[g]}</span>)}
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

export default BaseTVSlider
