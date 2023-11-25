import styles from './MediumSlider.module.scss'
import styled from 'styled-components'
import { EntryType } from '../../../api/show/titles.api'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

type PropsType = {
  topBoxOffice?: EntryType[]
}

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

const MediumSlider = (props: PropsType) => {
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
        style={{ boxShadow: ' -75px 0px 0px 0px rgba(0, 0, 0, 0.8) inset' }}
      >
        {props?.topBoxOffice?.map((m) => (
          <SwiperSlide key={m.id}>
            <Link to={`title/movie/${m.id}`}>
              {m.primaryImage && m.primaryImage.url && (
                <div className={styles.MovieCard}>
                  <img src={m.primaryImage.url} />
                  <div className={styles.MovieDetails}>
                    <h2 className="font-semibold text-xl text-white mb-2">{m.titleText.text}</h2>
                    <div className="flex max-w-full">
                      <div className="flex flex-col items-center">
                        <AiFillStar />
                        <div className="font-semibold text-lg mx-2 text-white">
                          {m.ratingsSummary.aggregateRating}
                        </div>
                      </div>
                      <div className="relative flex max-w-full w-10/12">
                        <div className={styles.Genres}>
                          {m.genres.genres.map((g) => (
                            <span className="font-semibold text-slate-400 mr-1" key={g.id}>
                              {g.text}
                            </span>
                          ))}
                        </div>
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

export default MediumSlider
