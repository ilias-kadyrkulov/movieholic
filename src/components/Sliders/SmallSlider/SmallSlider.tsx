import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { LazySlide } from '../LazySlide'
import { SmallSlide } from './SmallSlide'
import { MovieType } from '@/types/movie.types'
import styled from 'styled-components'

type PropsType = {
    data: MovieType[] | undefined
}

const CustomStyles = styled.div``

const SmallSlider = memo(function SmallSlider(props: PropsType) {
    return (
        <CustomStyles>
            <Swiper
                className='h-full'
                slidesPerView={1.5}
                navigation
                breakpoints={{
                    2000: {
                        slidesPerView: 5.5
                    },
                    1600: {
                        slidesPerView: 4.5
                    },
                    1250: {
                        slidesPerView: 3.5
                    },
                    950: {
                        slidesPerView: 4.5
                    },
                    768: {
                        slidesPerView: 3.5
                    },
                    475: {
                        slidesPerView: 2.5
                    }
                }}
            >
                {props.data?.map((e, index) => (
                    <SwiperSlide key={e.id}>
                        <Link to={`title/movie/${e.id}`}>
                            {e.poster_path && (
                                <LazySlide poster_path={e.poster_path} threshold={0} margins='200px 0px'>
                                    <SmallSlide
                                        index={index}
                                        genre_ids={e.genre_ids}
                                        title={e.title}
                                        vote_average={e.vote_average}
                                    />
                                </LazySlide>
                            )}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </CustomStyles>
    )
})

export default SmallSlider
