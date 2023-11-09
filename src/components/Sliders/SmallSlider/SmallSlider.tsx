import Slider from 'react-slick'
import styles from './SmallSlider.module.scss'
import styled from 'styled-components'
import { SmallMediumEntryType } from '../../../api/show/titles.api'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'

type PropsType = {
    popularOfTheWeek?: SmallMediumEntryType[]
}

const CustomStyles = styled.div`
    .slick-prev {
        left: -45px;
        width: 40px;
        height: 40px;
    }
    .slick-prev::before {
        font-size: 30px;
        color: rgb(42, 153, 83);
    }
    .slick-next {
        right: -30px;
        width: 40px;
        height: 40px;
    }
    .slick-next::before {
        font-size: 30px;
        color: rgb(42, 153, 83);
    }

    @media(max-width: 768px) {
        .slick-prev {
            left: -15px;
        }
        .slick-next {
            right: -5px;
        }
    }
    @media(max-width: 475px) {
        .slick-prev {
            left: -5px;
        }
        .slick-next {
            right: 0px;
        }
    }
`

const SmallSlider = (props: PropsType) => {
    let settings = {
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows: 1,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1250,
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
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <CustomStyles>
            <Slider {...settings} className={styles.SmallSlider}>
                {props.popularOfTheWeek?.map((e, index) => (
                    <Link to={`title/${e.id}`} key={e.id}>
                        {e.primaryImage && e.primaryImage.url && (
                            <div className={styles.MovieCard}>
                                <div className={styles.Number}>{index + 1}</div>
                                <img src={e.primaryImage.url} />
                                <div className={styles.MovieDetails}>
                                    <h2 className="font-bold text-base text-white mt-3">
                                        {e.originalTitleText.text}
                                    </h2>

                                    <div className={styles.Rating}>
                                        <AiFillStar />
                                        <div className="font-bold text-lg mx-2 text-white">
                                            {e.ratingsSummary.aggregateRating}
                                        </div>
                                        <div className="relative">
                                            <div className={styles.TitleType}>
                                                {e.titleType.text}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.Genres}>
                                        <div>
                                            <LiaFilmSolid />
                                        </div>
                                        <div className="leading-3 w-3/4 text-center">
                                            {e.genres.genres.map((g) => (
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
                        )}
                    </Link>
                ))}
            </Slider>
        </CustomStyles>
    )
}

export default SmallSlider
