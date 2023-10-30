import Slider from 'react-slick'
import styles from './SmallSlider.module.scss'
import { SmallMediumEntryType } from '../../api/show/titles.api'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'

type PropsType = {
    popularOfTheWeek?: SmallMediumEntryType[]
}

const SmallSlider = (props: PropsType) => {
    let settings = {
        infinite: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 2,
        rows: 1
    }

    return (
        <Slider {...settings} className={styles.SmallSlider}>
            {props.popularOfTheWeek?.map((e, index) => (
                <>
                    {e.primaryImage && e.primaryImage.url && (
                        <Link to={`titles/${e.id}`} key={e.id}>
                            <div className={styles.MovieCard}>
                                <div className="flex items-center font-bold text-white text-5xl">
                                    {index + 1}
                                </div>
                                <img src={e.primaryImage.url} />
                                <div className={styles.MovieDetails}>
                                    <h2 className="font-bold text-base text-white">
                                        {e.originalTitleText.text}
                                    </h2>

                                    <div className="flex items-center my-2">
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
                                            {e.genres.genres.map((g) => (
                                                <>
                                                    <span
                                                        className="font-bold text-slate-400 mr-1"
                                                        key={g.id}
                                                    >
                                                        {g.text}
                                                    </span>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
                </>
            ))}
        </Slider>
    )
}

export default SmallSlider
