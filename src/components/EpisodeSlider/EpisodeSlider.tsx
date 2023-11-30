import styles from './EpisodeSlider.module.scss'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EpisodesType } from '../../types/types'
import { tmdbApiConfig } from '../../api/tmdbV3/tmdb.api'

type PropsType = {
  titleText: string | undefined
  data: EpisodesType[] | undefined
}

const CustomStyles = styled.div`
  .slick-slide {
    padding-left: 1rem;
  }
  .slick-prev {
    left: -40px;
  }
  .slick-prev::before {
    font-size: 30px;
    color: rgb(42, 153, 83);
  }
  .slick-next {
    right: -35px;
  }
  .slick-next::before {
    font-size: 30px;
    color: rgb(42, 153, 83);
  }

  @media (max-width: 1024px) {
    .slick-prev {
      left: -20px;
    }
    .slick-prev::before {
      font-size: 25px;
    }
    .slick-next {
      right: -30px;
    }
    .slick-next::before {
      font-size: 25px;
    }
  }
  @media (max-width: 768px) {
    .slick-slide {
      padding-left: 0.5rem;
    }
    .slick-prev::before {
      font-size: 20px;
    }
    .slick-next {
      right: -25px;
    }
    .slick-next::before {
      font-size: 20px;
    }
  }
  @media (max-width: 550px) {
    .slick-next {
      right: -22px;
    }
  }
  @media (max-width: 425px) {
    .slick-slide {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    .slick-prev {
      left: -15px;
    }
    .slick-next {
      right: -15px;
    }
  }
`

const EpisodeSlider = ({ data, titleText }: PropsType) => {
  return (
    <CustomStyles>
      <Swiper
        className={styles.EpisodeSlider}
        slidesPerView={1.2}
        spaceBetween={20}
        navigation
        breakpoints={{
          2400: {
            slidesPerView: 5.5,
          },
          1990: {
            slidesPerView: 4.5,
          },
          1550: {
            slidesPerView: 3.5,
          },
          1150: {
            slidesPerView: 2.5,
          },
        }}
      >
        {data?.map((e, index) => (
          <SwiperSlide key={index}>
            <Link to={`${titleText}/season/${e.season_number}/ep-${index + 1}`} className="h-full">
              <div
                className="relative h-full"
                style={{
                  backgroundImage: `url(${tmdbApiConfig.originalImage(e.still_path)})`,
                  backgroundSize: 'cover',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => {}}
              >
                <div className="absolute bottom-1 left-3">
                  <h4 className="font-semibold text-lg text-slate-100">Episode {index + 1}</h4>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomStyles>
  )
}

export default EpisodeSlider
