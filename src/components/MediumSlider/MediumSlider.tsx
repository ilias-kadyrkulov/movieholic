import Slider from 'react-slick'
import styles from './MediumSlider.module.scss'
import styled from 'styled-components'
import { EntryType } from '../../api/show/titles.api'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type PropsType = {
    topBoxOffice?: EntryType[]
}

const CustomStyles = styled.div`
    .slick-slide {
        height: 450px;
    }

    @media (max-width: 1400px) {
        .slick-slide {
            height: 350px;
        }
    }
    @media (max-width: 1200px) {
        .slick-slide {
            height: 300px;
        }
    }
    @media (max-width: 768px) {
        .slick-slide {
            height: 400px;
        }
    }
    @media (max-width: 600px) {
        .slick-slide {
            height: 500px;
        }
    }
`

const MediumSlider = (props: PropsType) => {
    let settings = {
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 2,
        rows: 1,
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    }

    return (
        <CustomStyles>
            <Slider {...settings} className={styles.MediumSlider}>
                {props?.topBoxOffice?.map((m) => (
                    <Link to={`title/${m.id}`} key={m.id} className='h-full'>
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
