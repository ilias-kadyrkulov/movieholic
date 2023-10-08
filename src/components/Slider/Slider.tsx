import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import styles from './Slider.module.scss'
import swfa from '../../assets/swfa.jpg'

const images = [{ url: swfa, title: 'Star Wars: The Force Awakens' }]

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
                <div key={index}>
                    <img src={s.url} />
                    <h3>{s.title}</h3>
                </div>
            ))}
            {/* <div>
                    <img src={swfa} alt="" />
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div> */}
        </Slider>
    )
}
