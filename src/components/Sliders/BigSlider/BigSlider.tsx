import { useContext } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import styles from './BigSlider.module.scss'
import styled from 'styled-components'
import { TopRatedSeriesEntryType } from '../../../api/show/titles.api'
import GreenButton from '../../../common/Buttons/GreenButton/GreenButton'
import TransparrentButton from '../../../common/Buttons/TransparrentButton/TransparrentButton'
import { useAppSelector } from '../../../hooks/hooks'
import { UserContext } from '../../../App'
import WatchTrailerButton from '../../../common/Buttons/WatchTraillerButton/WatchTrailerButton'

type PropsType = {
    topRatedSeries: TopRatedSeriesEntryType[] | undefined
}

const CustomDots = styled.div`
    @media (max-width: 768px) {
        .slick-dots {
            bottom: 0.5rem;
            right: 1rem;
        }
        li {
            margin-left: 0px;
            margin-right: 2px;
        }
    }
    @media (max-width: 425px) {
        li {
            button::before {
                font-size: 10px;
            }
        }
    }
`

export const BigSlider = (props: PropsType) => {
    const watchList = useAppSelector((state) => state.watchList)

    const user = useContext(UserContext)

    let settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    // let sSettings = {
    //     infinite: false,
    //     swipe: false,
    //     speed: 500,
    //     slidesToShow: 9,
    //     slidesToScroll: 1
    // }

    return (
        <>
            <CustomDots>
                <Slider {...settings} className={styles.Carousel}>
                    {props.topRatedSeries?.map((s) => (
                        <div key={s.id} className={styles.Slide}>
                            <div
                                className={`bg-cover bg-no-repeat bg-center h-full`}
                                style={{
                                    backgroundImage: `url(${s.primaryImage.url})`
                                }}
                            >
                                <div className={styles.Details}>
                                    <h3 className="text-4xl text-slate-200 font-bold">
                                        {s.titleText.text}
                                    </h3>
                                    <div>
                                        <p className="font-bold text-slate-400">
                                            Episode duration:{' '}
                                            {s.runtime.seconds / 60}min
                                        </p>
                                        <span className="font-bold text-slate-400">
                                            {s.releaseYear.year} •{' '}
                                        </span>
                                        {s.genres.genres.map((g) => (
                                            <span
                                                className="font-bold text-slate-400 mr-1"
                                                key={g.id}
                                            >
                                                {g.text} •
                                            </span>
                                        ))}
                                    </div>
                                    <p className="font-medium text-gray-300">
                                        {s.plot.plotText.plainText}
                                    </p>
                                    <div className={styles.Buttons}>
                                        <GreenButton text="Watch" id={s.id} />
                                        <WatchTrailerButton
                                            id={s.id}
                                            text="Watch Trailer"
                                        />
                                        {user && !watchList.includes(s.id) && (
                                            <TransparrentButton
                                                text="Add to Watchlist"
                                                id={s.id}
                                            />
                                        )}
                                        {user && watchList.includes(s.id) && (
                                            <TransparrentButton
                                                text="Remove from Watchlist"
                                                id={s.id}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </CustomDots>
            {/* <div className={styles.Inner}>
                <Slider {...sSettings} className={styles.MiniCarousel}>
                    <div>
                        <img src={disneyIcon} />
                    </div>
                    <div>
                        <img src={hboIcon} />
                    </div>
                    <div>
                        <img src={netflixIcon} />
                    </div>
                    <div>
                        <img src={disneyIcon} />
                    </div>
                    <div>
                        <img src={hboIcon} />
                    </div>
                    <div>
                        <img src={netflixIcon} />
                    </div>
                    <div>
                        <img src={disneyIcon} />
                    </div>
                    <div>
                        <img src={hboIcon} />
                    </div>
                </Slider>
            </div> */}
        </>
    )
}
