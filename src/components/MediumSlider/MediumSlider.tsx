import Slider from 'react-slick'
import styles from './MediumSlider.module.scss'
import { EntryType } from '../../api/titles.api'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type PropsType = {
    topBoxOffice?: EntryType[]
}

const MediumSlider = (props: PropsType) => {
    let settings = {
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 2,
        rows: 1
    }

    return (
        <Slider {...settings} className={styles.MediumSlider}>
            {props?.topBoxOffice?.map((m) => (
                <>
                    {m.primaryImage && m.primaryImage.url && (
                        <Link to={`titles/${m.id}`} key={m.id}>
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
                        </Link>
                    )}
                </>
            ))}
        </Slider>
    )
}

export default MediumSlider
