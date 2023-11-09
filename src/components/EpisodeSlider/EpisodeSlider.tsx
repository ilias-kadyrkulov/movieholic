import Slider from 'react-slick'
import styles from './EpisodeSlider.module.scss'
import { FileType } from '../../api/filemoon/file.api'
import { useActions } from '../../hooks/useActions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type PropsType = {
    titleText: string | undefined
    fileList: FileType[] | undefined
}

const CustomSlides = styled.div`
    .slick-slide {
        height: 100%;
    }
`

const EpisodeSlider = (props: PropsType) => {
    const { fileBeenChosen } = useActions()

    let settings = {
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 5,
        rows: 1,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <CustomSlides>
            <Slider {...settings} className={styles.EpisodeSlider}>
                {props?.fileList?.map((f, index) => (
                    <Link
                        to={`tvSeries/${props.titleText}/ep-${index + 1}`}
                        key={index}
                        className='h-full'
                    >
                        <div
                            className="relative h-full mr-4"
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
        </CustomSlides>
    )
}

export default EpisodeSlider
