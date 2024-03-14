import { memo, useEffect, useMemo } from 'react'
import { useGetLatestReleasedMoviesQuery } from '@/api/tmdbV3/movies.api'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/hooks/hooks'
import { useActions } from '@/hooks/useActions'
import { Swiper, SwiperSlide } from 'swiper/react'
import { LazySlide } from '../LazySlide'
import { MediumSlide } from './MediumSlide'
import styled from 'styled-components'
import styles from './MediumSlider.module.scss'

const CustomStyles = styled.div`
    @media (min-width: 576px) {
        .swiper-slide {
            height: 600px;
        }
    }
    @media (min-width: 678px) {
        .swiper-slide {
            height: 700px;
        }
    }
    @media (min-width: 768px) {
        .swiper-slide {
            height: 450px;
        }
    }
    @media (min-width: 800px) {
        .swiper-slide {
            height: 500px;
        }
    }
    @media (min-width: 900px) {
        .swiper-slide {
            height: 550px;
        }
    }
    @media (min-width: 950px) {
        .swiper-slide {
            height: 600px;
        }
    }
    @media (min-width: 1100px) {
        .swiper-slide {
            height: 650px;
        }
    }
    @media (min-width: 1200px) {
        .swiper-slide {
            height: 500px;
        }
    }
    @media (min-width: 1400px) {
        .swiper-slide {
            height: 550px;
        }
    }
    @media (min-width: 1600px) {
        .swiper-slide {
            height: 650px;
        }
    }
    @media (min-width: 1800px) {
        .swiper-slide {
            height: 750px;
        }
    }
    @media (min-width: 2000px) {
        .swiper-slide {
            height: 875px;
        }
    }
    @media (min-width: 2300px) {
        .swiper-slide {
            height: 800px;
        }
    }
`

const MediumSlider = memo(function MediumSilder() {
    const current = new Date()
    const date = `${current.getFullYear()}-${
        current.getMonth() + 1
    }-${current.getDate()}`
    const { data: latestMovieData } = useGetLatestReleasedMoviesQuery(date)

    const { latestReleasedMovieReceived, latestReleasedMoviesCleared } =
        useActions()

    useEffect(() => {
        latestReleasedMoviesCleared()
        latestMovieData && latestReleasedMovieReceived(latestMovieData.results)
    }, [latestMovieData])

    const latestReleasedMovies = useAppSelector(
        state => state.latestReleasedMovies
    )

    const memoizedLatestReleasedMovies = useMemo(
        () => latestReleasedMovies,
        [latestReleasedMovies]
    )

    return (
        <CustomStyles>
            <Swiper
                className={styles.MediumSlider}
                slidesPerView={1.5}
                spaceBetween={20}
                navigation
                breakpoints={{
                    2300: {
                        slidesPerView: 4.5
                    },
                    1200: {
                        slidesPerView: 3.5
                    },
                    768: {
                        slidesPerView: 2.5
                    }
                }}
            >
                {memoizedLatestReleasedMovies?.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <Link to={`title/movie/${movie.id}`}>
                            <LazySlide
                                poster_path={movie.poster_path}
                                threshold={0}
                                margins='200px 0px'
                            >
                                <MediumSlide
                                    title={movie.title}
                                    genre_ids={movie.genre_ids}
                                    vote_average={movie.vote_average}
                                />
                            </LazySlide>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </CustomStyles>
    )
})

export default MediumSlider
