import styles from './MediumSlider.module.scss'
import styled from 'styled-components'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'
import { useAppSelector } from '../../../hooks/hooks'

const CustomStyles = styled.div`
  @media (min-width: 325px) {
    .swiper-slide {
      height: 500px;
    }
  }
  @media (min-width: 425px) {
    .swiper-slide {
      height: 350px;
    }
  }
  @media (min-width: 650px) {
    .swiper-slide {
      height: 450px;
    }
  }
  @media (min-width: 768px) {
    .swiper-slide {
      height: 400px;
    }
  }
  @media (min-width: 950px) {
    .swiper-slide {
      height: 450px;
    }
  }
  @media (min-width: 1100px) {
    .swiper-slide {
      height: 500px;
    }
  }
  @media (min-width: 1200px) {
    .swiper-slide {
      height: 450px;
    }
  }
  @media (min-width: 1400px) {
    .swiper-slide {
      height: 500px;
    }
  }
  @media (min-width: 1600px) {
    .swiper-slide {
      height: 600px;
    }
  }
  @media (min-width: 1800px) {
    .swiper-slide {
      height: 650px;
    }
  }
  @media (min-width: 2000px) {
    .swiper-slide {
      height: 750px;
    }
  }
  @media (min-width: 2300px) {
    .swiper-slide {
      height: 800px;
    }
  }
`

const MediumSlider = () => {
  const movieGenres = useAppSelector((state) => state.movieGenres)
  const latestReleasedMovies = useAppSelector((state) => state.latestReleasedMovies)

  return (
    <CustomStyles>
      <Swiper
        className={styles.MediumSlider}
        spaceBetween={20}
        navigation
        breakpoints={{
          2300: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          425: {
            slidesPerView: 2,
          },
        }}
      >
        {latestReleasedMovies?.map((m) => (
          <SwiperSlide key={m.id}>
            <Link to={`title/movie/${m.id}`}>
                <div className={styles.MovieCard}>
                  <img src={tmdbApiConfig.originalImage(m.poster_path)} />
                  <div className={styles.MovieDetails}>
                    <h2 className="font-semibold text-base text-white mb-2">{m.title}</h2>
                    <div className="flex max-w-full">
                      <div className="flex items-center">
                        <AiFillStar />
                        <div className="font-semibold text-base mx-2 text-white">
                          {m.vote_average}
                        </div>
                      </div>
                      <div className="relative flex max-w-full w-10/12">
                        <div className={styles.Genres}>
                          {movieGenres &&
                            m.genre_ids?.map((g) => (
                              <span key={g}>
                                {movieGenres[g]}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomStyles>
  )
}

export default MediumSlider
