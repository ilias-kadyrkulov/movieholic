import styles from './EpisodeSlider.module.scss'
import { FileType } from '../../api/filemoon/file.api'
import { useActions } from '../../hooks/useActions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

type PropsType = {
  titleText: string | undefined
  fileList: FileType[] | undefined
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

const EpisodeSlider = (props: PropsType) => {
  const { fileBeenChosen } = useActions()

  return (
    <CustomStyles>
      <Swiper
        className={styles.EpisodeSlider}
        navigation
        breakpoints={{
          1440: {
            slidesPerView: 5,
          },
          1080: {
            slidesPerView: 4,
          },
          700: {
            slidesPerView: 3,
          },
          425: {
            slidesPerView: 2,
          }
        }}
      >
        {props?.fileList?.map((f, index) => (
          <SwiperSlide key={index}>
            <Link to={`tvSeries/${props.titleText}/ep-${index + 1}`} className="h-full">
              <div
                className="relative h-full"
                style={{
                  backgroundImage: `url(${f.thumbnail})`,
                  backgroundSize: 'cover',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  fileBeenChosen(f)
                }}
              >
                <div className="absolute bottom-5 left-5">
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
