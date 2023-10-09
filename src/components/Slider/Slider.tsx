import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import styles from './Slider.module.scss'
import swfa from '../../assets/swfa.jpg'
import { BsPlayCircle } from 'react-icons/bs'
import { GrBookmark } from 'react-icons/gr'

const images = [
    {
        url: swfa,
        title: 'Star Wars: The Force Awakens',
        details: ['2h40m', '2022', 'Fantasy', 'Actions'],
        desc: ' Lorem ipsum dolor sit, amet consecteturadipisicing elit. Maxime deserunt hic sit quosofficia quis, adipisci nisi voluptatibus, voluptate veritatis iusto quidem perferendisaspernatur asperiores ea maiores unde qui.Dolores.'
    },
    {
        url: swfa,
        title: 'Star Wars: The Force Awakens',
        details: ['2h40m', '2022', 'Fantasy', 'Actions'],
        desc: ' Lorem ipsum dolor sit, amet consecteturadipisicing elit. Maxime deserunt hic sit quosofficia quis, adipisci nisi voluptatibus, voluptate veritatis iusto quidem perferendisaspernatur asperiores ea maiores unde qui.Dolores.'
    },
    {
        url: swfa,
        title: 'Star Wars: The Force Awakens',
        details: ['2h40m', '2022', 'Fantasy', 'Actions'],
        desc: ' Lorem ipsum dolor sit, amet consecteturadipisicing elit. Maxime deserunt hic sit quosofficia quis, adipisci nisi voluptatibus, voluptate veritatis iusto quidem perferendisaspernatur asperiores ea maiores unde qui.Dolores.'
    }
]

export const Carousel = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <Slider {...settings} className={styles.Carousel}>
            {images.map((s, index) => (
                <div key={index} className={styles.Slide}>
                    <div
                        className={`bg-cover bg-no-repeat h-full`}
                        style={{ backgroundImage: `url(${s.url})` }}
                    >
                        <div className={styles.Details}>
                            <h3 className="text-4xl text-slate-200 font-bold">
                                {s.title}
                            </h3>
                            <span>{`• ${s.details}`}</span>
                            <p className="font-medium text-gray-300">
                                {s.desc}
                            </p>
                            <div className={styles.Buttons}>
                                <button className={styles.TrailerButton}>
                                    <BsPlayCircle />
                                    <span>Watch Trailer</span>
                                </button>
                                <button className={styles.WatchButton}>
                                    <GrBookmark />
                                    <span>Add to Watchlist</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}
