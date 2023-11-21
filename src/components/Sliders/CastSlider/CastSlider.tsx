import Slider from 'react-slick'
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
        movieId: Number(id)
    })

    let settings = {
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1220,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <CustomStyles>
            <Slider {...settings} className={styles.CastSlider}>
                {data?.cast?.map((e) => (
                    <div key={data.id}>
                        <div className={styles.Slide}>
                            <div
                                className={styles.Actor}
                                style={{
                                    backgroundImage: `url(${tmdbApiConfig.originalImage(
                                        e.profile_path
                                    )}), url(${castDummy})`,
                                    backgroundSize: 'cover',
                                    borderRadius: '50%'
                                }}
                            />
                            <div className="flex flex-col ml-3 font-medium">
                                <h3 className="text-slate-100 w-full">
                                    {e.name}
                                </h3>
                                <p className="text-slate-400 w-24">
                                    {e.character}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </CustomStyles>
    )
}

export default CastSlider
