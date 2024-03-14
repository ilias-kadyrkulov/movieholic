import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { BigSliderSlide } from './BigSliderSlide/BigSliderSlide'
import { LazySlide } from '../LazySlide'
import { NowPlayingMovieType } from '@/types/movie.types'
import styles from './BigSlider.module.scss'
import styled from 'styled-components'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Autoplay, Pagination])

type PropsType = {
    data: NowPlayingMovieType[] | undefined
}

const CustomStyles = styled.div`
    .swiper {
        height: 850px;
    }

    .swiper-pagination-bullet {
        background: #fff;
        width: 10px;
        height: 10px;
    }

    .swiper-horizontal {
        .swiper-pagination-bullet {
            margin: 0 10px;
        }
    }

    @media (max-width: 768px) {
        .swiper {
            height: 600px;
        }

        .swiper-button-next,
        .swiper-button-prev {
            width: 0;
        }
    }
    @media (min-width: 1600px) {
        .swiper-pagination {
            text-align: right;
        }

        .swiper-pagination-bullet {
            background: #fff;
            width: 10px;
            height: 10px;
        }

        .swiper-pagination-bullets.swiper-pagination-horizontal {
            left: unset;
            right: 50px;
            bottom: 50px;
        }
    }

    @media (max-width: 768px) {
        .swiper-pagination-bullets.swiper-pagination-horizontal {
            bottom: 2px;
        }
    }
    @media (max-width: 768px) {
        .swiper-horizontal {
            .swiper-pagination-bullet {
                margin: 0 5px;
            }
        }
    }
    @media (max-width: 400px) {
        .swiper-horizontal {
            .swiper-pagination-bullet {
                margin: 0 3px;
            }
        }
    }
`

export const BigSlider = (props: PropsType) => {
    return (
        <>
            <CustomStyles>
                <Swiper
                    className={styles.BigSlider}
                    slidesPerView={1}
                    autoplay={{ delay: 7000 }}
                    pagination={{ clickable: true }}
                >
                    {props.data?.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <div className={styles.Slide}>
                                <LazySlide poster_path={movie.poster_path} threshold={0}>
                                    <BigSliderSlide {...movie} />
                                </LazySlide>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </CustomStyles>
        </>
    )
}
