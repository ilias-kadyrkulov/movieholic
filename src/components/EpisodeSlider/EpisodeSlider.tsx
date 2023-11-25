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

const CustomStyles = styled.div`
    .slick-slide {
        padding-left: 1rem;
    }
    .slick-prev {
        left: -40px;
    }
    .slick-prev::before {
        font-size: 30px;
        color: rgb(42, 153, 83);
    }
    .slick-next {
        right: -35px;
    }
    .slick-next::before {
        font-size: 30px;
        color: rgb(42, 153, 83);
    }

    @media (max-width: 1024px) {
        .slick-prev {
            left: -20px;
        }
        .slick-prev::before {
            font-size: 25px;
        }
        .slick-next {
            right: -30px;
        }
        .slick-next::before {
            font-size: 25px;
        }
    }
    @media (max-width: 768px) {
        .slick-slide {
            padding-left: 0.5rem;
        }
        .slick-prev::before {
            font-size: 20px;
        }
        .slick-next {
            right: -25px;
        }
        .slick-next::before {
            font-size: 20px;
        }
    }
    @media (max-width: 550px) {
        .slick-next {
            right: -22px;
        }
    }
    @media (max-width: 425px) {
        .slick-slide {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        }
        .slick-prev {
            left: -15px;
        }
        .slick-next {
            right: -15px;
        }
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
        <CustomStyles>
            <Slider {...settings} className={styles.EpisodeSlider}>
                {props?.fileList?.map((f, index) => (
                    <Link
                        to={`tvSeries/${props.titleText}/ep-${index + 1}`}
                        key={index}
                        className="h-full"
                    >
                        <div
                            className="relative h-full"
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
                                <h4 className="font-semibold text-lg text-slate-100">
                                    Episode {index + 1}
                                </h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </CustomStyles>
    )
}

export default EpisodeSlider
