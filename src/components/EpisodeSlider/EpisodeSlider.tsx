import Slider from 'react-slick'
import styles from './EpisodeSlider.module.scss'
import { FileType } from '../../api/filemoon/file.api'
import { useActions } from '../../hooks/useActions'
import { Link } from 'react-router-dom'

type PropsType = {
    titleText: string | undefined
    fileList: FileType[] | undefined
}

const EpisodeSlider = (props: PropsType) => {
    const { fileBeenChosen } = useActions()

    let settings = {
        arrows: true,
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 2,
        rows: 1
    }

    return (
        <Slider {...settings} className={styles.EpisodeSlider}>
            {props?.fileList?.map((f, index) => (
                <Link to={`tvSeries/${props.titleText}/ep-${index + 1}`} key={index}>
                    <div
                        className="relative h-36 mr-4"
                        style={{
                            backgroundImage: `url(${f.thumbnail})`,
                            backgroundSize: 'cover',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            fileBeenChosen(f)
                        }}
                    >
                        <div className="absolute bottom-5 left-5">
                            <h4 className="font-bold text-lg text-slate-100">
                                Episode {index + 1}
                            </h4>
                        </div>
                    </div>
                </Link>
            ))}
        </Slider>
    )
}

export default EpisodeSlider
