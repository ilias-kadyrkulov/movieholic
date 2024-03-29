import Slider from 'react-slick'
import styles from './VerticalEpisodeSlider.module.scss'
import { useActions } from '@/hooks/useActions'
import { useAppSelector } from '@/hooks/hooks'
import { Link, useParams } from 'react-router-dom'

const VerticalEpisodeSlider = () => {
    const { id } = useParams<{ ep?: string; id: string }>()

    const { fileBeenChosen } = useActions()

    const fileList = useAppSelector((state) => state.player.fileList)

    let settings = {
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 2,
        vertical: true,
        verticalSwiping: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    }

    return (
        <Slider {...settings} className={styles.EpisodeSlider}>
            {fileList?.map((f, index) => (
                <Link to={`title/${id}/ep-${index + 1}`} replace key={index}>
                    <div    
                        className={styles.Episode}
                        style={{
                            backgroundImage: `url(${f.thumbnail})`,
                            backgroundSize: 'cover',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
                        key={index}
                        onClick={() => {
                            fileBeenChosen(f)
                        }}
                    >
                        <div className="absolute bottom-3 left-3">
                            <h4 className="font-semibold text-lg text-slate-100">
                                Episode {index + 1}
                            </h4>
                        </div>
                    </div>
                </Link>
            ))}
        </Slider>
    )
}

export default VerticalEpisodeSlider
