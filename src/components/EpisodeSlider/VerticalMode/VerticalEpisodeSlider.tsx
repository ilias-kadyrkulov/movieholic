import Slider from 'react-slick'
import styles from '../EpisodeSlider.module.scss'
import { useActions } from '../../../hooks/useActions'
import { useAppSelector } from '../../../hooks/hooks'

const VerticalEpisodeSlider = () => {
    const { playerEnabled } = useActions()

    const fileList = useAppSelector((state) => state.player.fileList)
    console.log(fileList)

    let settings = {
        arrows: true,
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 4,
        vertical: true,
        verticalSwiping: true
    }

    return (
        <Slider {...settings} className={styles.EpisodeSlider}>
            {fileList?.map((f, index) => (
                <>
                    <div
                        className="relative h-28 mx-10 mb-3 rounded-full"
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
                </>
            ))}
        </Slider>
    )
}

export default VerticalEpisodeSlider
