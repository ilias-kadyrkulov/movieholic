import Slider from 'react-slick'
import styles from './EpisodeSlider.module.scss'
import { FileType } from '../../api/filemoon/file.api'
import { useActions } from '../../hooks/useActions'
import { Link } from 'react-router-dom'

type PropsType = {
    fileList: FileType[] | undefined
}

const EpisodeSlider = (props: PropsType) => {
    const { playerEnabled } = useActions()

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
                <>
                    <Link to={`ep-${index+1}`}>
                        <div
                            className="relative h-52 mr-4"
                            style={{
                                backgroundImage: `url(${f.thumbnail})`,
                                backgroundSize: 'cover',
                                borderRadius: '20px',
                                cursor: 'pointer'
                            }}
                            key={index}
                            onClick={() => {
                                playerEnabled({ file_code: f.file_code })
                            }}
                        >
                            <div className="absolute bottom-10 left-5">
                                <h4 className="font-bold text-lg text-slate-100">
                                    Episode {index + 1}
                                </h4>
                            </div>
                        </div>
                    </Link>
                </>
            ))}
        </Slider>
    )
}

export default EpisodeSlider
