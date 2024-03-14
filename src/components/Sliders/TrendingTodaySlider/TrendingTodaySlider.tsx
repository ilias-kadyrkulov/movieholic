import { Swiper, SwiperSlide } from 'swiper/react'
import { memo } from 'react'
import { MovieType } from '@/types/movie.types'
import { MovieDetailsRequestType } from '@/types/details.types'
import { LazySlide } from '../LazySlide'
import { TrendingTodaySlide } from './TrendingTodaySlide'
import styled from 'styled-components'
import styles from './TrendingTodaySlider.module.scss'

type PropsType = {
    data: MovieType[] | undefined
    getMovieDetails: (movieId: MovieDetailsRequestType) => void
    setPopularity: (index: number) => void
}

const CustomStyles = styled.div``

const TrendingTodaySlider = memo(function TrendingTodaySlider({
    data,
    getMovieDetails,
    setPopularity
}: PropsType) {

    return (
        <CustomStyles>
            <Swiper
                className={styles.TrendingTodaySlider}
                slidesPerView={1.3}
                spaceBetween={20}
                navigation
                breakpoints={{
                    2400: {
                        slidesPerView: 3.5
                    },
                    1270: {
                        slidesPerView: 2.5
                    },
                    1160: {
                        slidesPerView: 1.5
                    },
                    950: {
                        slidesPerView: 3.5
                    },
                    710: {
                        slidesPerView: 2.5
                    },
                    425: {
                        slidesPerView: 1.4
                    }
                }}
                onSlideChange={swiper => {
                    const currentIndex = swiper.activeIndex
                    const selectedMovie = data && data[currentIndex]

                    if (selectedMovie) {
                        getMovieDetails({ movieId: selectedMovie.id })
                        setPopularity(currentIndex + 1)
                    }
                }}
            >
                {data?.map((movie, index) => (
                    <SwiperSlide
                        className='rounded-2xl'
                        key={movie.id}
                        onClick={() => {
                            getMovieDetails({ movieId: movie.id })
                            setPopularity(index + 1)
                        }}
                    >
                        {movie.backdrop_path && (
                            <LazySlide
                                poster_path={movie.poster_path}
                                threshold={0}
                                margins='200px 0px'
                            >
                                <TrendingTodaySlide
                                    genre_ids={movie.genre_ids}
                                    title={movie.title}
                                    vote_average={movie.vote_average}
                                />
                            </LazySlide>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </CustomStyles>
    )
})

export default TrendingTodaySlider
