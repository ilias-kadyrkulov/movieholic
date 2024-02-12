import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './CastSlider.module.scss'
import castDummy from '@/assets/noPhotoActor.png'
import styled from 'styled-components'
import { tmdbApiConfig } from '@/api/tmdbV3/tmdb.api'
import { CastType } from '@/types/types'

type PropsType = {
  data: CastType[] | undefined
}

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

const CastSlider = ({ data }: PropsType) => {
  return (
    <CustomStyles>
      <Swiper
        className={styles.CastSlider}
        slidesPerView={1.2}
        navigation
        breakpoints={{
          1920: {
            slidesPerView: 6.5,
          },
          1600: {
            slidesPerView: 5.5,
          },
          1220: {
            slidesPerView: 4.5,
          },
          990: {
            slidesPerView: 3.5,
          },
          735: {
            slidesPerView: 2.5,
          },
          375: {
            slidesPerView: 1.5,
          },
        }}
      >
        {data?.map((e) => (
          <SwiperSlide key={e.id}>
            <div className={styles.Slide}>
              <div
                className={styles.Actor}
                style={{
                  backgroundImage: `url(${tmdbApiConfig.w500Image(
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
