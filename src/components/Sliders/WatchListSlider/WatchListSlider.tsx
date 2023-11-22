import Slider from 'react-slick'
import styles from './WatchListSlider.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CustomStyles = styled.div`
.slick-slide {
    padding-left: 2rem;
}
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
    @media(max-width: 425px) {
        .slick-slide {
            padding-left: 0rem;
        }
    }
`

const WatchListSlider = () => {

    //TODO - Watchlist data

    const mockData: any = []

    let settings = {
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 2,
        rows: 1,
        responsive: [
            {
                breakpoint: 1470,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <CustomStyles>
            <Slider {...settings} className={styles.WatchListSlider}>
                {mockData?.map((e: any) => (
                    <Link to={`title/${e.id}`} key={e.id}>
                        {e.primaryImage && e.primaryImage.url && (
                            <div className={styles.MovieCard}>
                                <img src={e.primaryImage.url} />
                                <div className={styles.MovieDetails}>
                                    <h2 className="font-bold text-base text-white">
                                        {e.titleText.text}
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
                                        <div className="pr-1">
                                            <LiaFilmSolid />
                                        </div>
                                        <div className="leading-3 w-full">
                                            {e.genres.genres.map((g: any) => (
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

export default WatchListSlider
