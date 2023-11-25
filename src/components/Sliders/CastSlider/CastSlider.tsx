import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './CastSlider.module.scss'
import castDummy from '../../../assets/noPhotoActor.png'
import styled from 'styled-components'
import { useGetCastDetailsByMovieIdQuery } from '../../../api/tmdbV3/movies.api'
import { useParams } from 'react-router-dom'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'

const CustomStyles = styled.div`
  .slick-slide {
    padding-left: 1rem;
  }
  .slick-prev {
    left: -40px;
    top: 45px;
  }
  .slick-prev::before {
    font-size: 30px;
    color: rgb(42, 153, 83);
  }
  .slick-next {
    right: -35px;
    top: 45px;
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
      right: -25px;
    }
    .slick-next::before {
      font-size: 25px;
    }
  }
  @media (max-width: 768px) {
    .slick-slide {
      padding-left: 1rem;
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
  @media (max-width: 650px) {
    .slick-prev {
      left: -15px;
    }
    .slick-next {
      right: -15px;
    }
  }
  @media (max-width: 550px) {
    .slick-next {
      right: -20px;
    }
  }
`

const CastSlider = () => {
  const { id } = useParams<{ id: string }>()

  const { data } = useGetCastDetailsByMovieIdQuery({
    movieId: Number(id),
  })

  return (
    <CustomStyles>
      <Swiper
        className={styles.SmallSlider}
        navigation
        breakpoints={{
          1920: {
            slidesPerView: 6,
          },
          1600: {
            slidesPerView: 5,
          },
          1220: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 3,
          },
          610: {
            slidesPerView: 2
          }
        }}
      >
        {data?.cast?.map((e) => (
          <SwiperSlide key={e.id}>
            <div className={styles.Slide}>
              <div
                className={styles.Actor}
                style={{
                  backgroundImage: `url(${tmdbApiConfig.originalImage(
                    e.profile_path,
                  )}), url(${castDummy})`,
                  backgroundSize: 'cover',
                  borderRadius: '50%',
                }}
              />
              <div className="flex flex-col ml-3 font-medium">
                <h3 className="text-slate-100 w-full">{e.name}</h3>
                <p className="text-slate-400 w-24">{e.character}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomStyles>
  )
}

export default CastSlider
