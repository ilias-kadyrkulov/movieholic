import Slider from 'react-slick'
import styles from './MediumSlider.module.scss'
import styled from 'styled-components'
import { EntryType } from '../../../api/show/titles.api'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type PropsType = {
    topBoxOffice?: EntryType[]
}

const CustomStyles = styled.div`
    .slick-slide {
        height: 750px;
        padding-right: 1.25rem;
        padding-left: 0.75rem;
    }
    .slick-prev {
        left: -45px;
        width: 40px;
        height: 40px;
    }
    .slick-prev::before {
        font-size: 40px;
        color: rgb(42, 153, 83);
    }
    .slick-next {
        right: -30px;
        width: 40px;
        height: 40px;
    }
    .slick-next::before {
        font-size: 40px;
        color: rgb(42, 153, 83);
    }

    @media (max-width: 2250px) {
        .slick-slide {
            height: 600px;
        }
    }
    @media (max-width: 1920px) {
        .slick-slide {
            height: 500px;
        }
    }
    @media (max-width: 1640px) {
        .slick-slide {
            height: 400px;
        }
    }
    @media (max-width: 1175px) {
        .slick-slide {
            height: 350px;
        }
    }
    @media (max-width: 900px) {
        .slick-slide {
            height: 300px;
        }
    }
    @media (max-width: 768px) {
        .slick-slide {
            height: 450px;
            padding-right: 0.75rem;
        }
        .slick-prev {
            left: -35px;
        }
        .slick-prev::before {
            font-size: 30px;
        }
        .slick-next {
            right: -20px;
        }
        .slick-next::before {
            font-size: 30px;
        }
    }
    @media (max-width: 678px) {
        .slick-prev {
            left: -25px;
        }
        .slick-prev::before {
            font-size: 25px;
        }
        .slick-next {
            right: -20px;
        }
        .slick-next::before {
            font-size: 25px;
        }
    }
    @media (max-width: 600px) {
        .slick-slide {
            height: 700px;
        }
    }
    @media (max-width: 500px) {
        .slick-slide {
            height: 550px;
        }
    }
    @media (max-width: 475px) {
        .slick-slide {
            padding-right: 1.25rem;
            padding-left: 1.25rem;
        }
        .slick-prev {
            left: -18px;
        }
        .slick-next {
            right: -13px;
        }
    }
    @media (max-width: 375px) {
        .slick-slide {
            height: 500px;
        }
    }
    @media (max-width: 325px) {
        .slick-slide {
            height: 400px;
        }
    }
`

const MediumSlider = (props: PropsType) => {
    let settings = {
        infinite: true,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 5,
        rows: 1,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <CustomStyles>
            <Slider {...settings} className={styles.MediumSlider}>
                {props?.topBoxOffice?.map((m) => (
                    <Link to={`title/${m.id}`} key={m.id} className="h-full">
                        {m.primaryImage && m.primaryImage.url && (
                            <div className={styles.MovieCard}>
                                <img src={m.primaryImage.url} />
                                <div className={styles.MovieDetails}>
                                    <h2 className="font-bold text-xl text-white mb-2">
                                        {m.titleText.text}
                                    </h2>
                                    <div className="flex max-w-full">
                                        <div className="flex flex-col items-center">
                                            <AiFillStar />
                                            <div className="font-bold text-lg mx-2 text-white">
                                                {
                                                    m.ratingsSummary
                                                        .aggregateRating
                                                }
                                            </div>
                                        </div>
                                        <div className="relative flex max-w-full w-10/12">
                                            <div className={styles.Genres}>
                                                {m.genres.genres.map((g) => (
                                                    <span
                                                        className="font-bold text-slate-400 mr-1"
                                                        key={g.id}
                                                    >
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
                ))}
            </Slider>
        </CustomStyles>
    )
}

export default MediumSlider
