import Slider from 'react-slick'
import styles from './WatchListSlider.module.scss'
import { useGetWatchListQuery } from '../../../api/show/titles.api'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/hooks'

const WatchListSlider = () => {
    const showIds = useAppSelector((state) => state.watchList)

    const { results } = useGetWatchListQuery(showIds, {
        selectFromResult: ({ data }) => ({
            results: data?.results
        })
    })

    let settings = {
        infinite: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 2,
        rows: 1,
        centerMode: true,
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
        <Slider {...settings} className={styles.WatchListSlider}>
            {results?.map((e) => (
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
                                    <div className='font-bold text-lg mx-2 text-white'>
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
    )
}

export default WatchListSlider
