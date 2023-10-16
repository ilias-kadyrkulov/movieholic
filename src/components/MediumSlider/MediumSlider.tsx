import Slider from 'react-slick'
import styles from './MediumSlider.module.scss'
import { EntryType } from '../../api/titles.api'
import { AiFillStar } from 'react-icons/ai'

type PropsType = {
    mostPopularMovies?: EntryType[]
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
            {props?.mostPopularMovies?.map((m) => (
                <>
                    {m.primaryImage && m.primaryImage.url && (
                        <div className={styles.OuterBlock}>
                            <div
                                className={styles.MovieCard}
                                key={m.id}
                                // style={{
                                //     backgroundImage: `url(${m.primaryImage.url})`
                                // }}
                            >
                                <img src={m.primaryImage.url} />
                                <div className="absolute bottom-6 left-6">
                                    <h2 className="font-bold text-white mb-2">
                                        {m.titleText.text}
                                    </h2>
                                    <div className="flex items-center">
                                        <AiFillStar />
                                        <div className="font-bold mx-2 text-white">
                                            {m.ratingsSummary.aggregateRating}
                                        </div>
                                        <div className='relative flex items-center'>
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
                        </div>
                    )}
                </>
            ))}
        </Slider>
    )
}

export default MediumSlider
