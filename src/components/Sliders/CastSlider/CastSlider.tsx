import Slider from 'react-slick'
import styles from './CastSlider.module.scss'
import { CastEntryType } from '../../../api/show/titles.api'
import castDummy from '../../../assets/noPhotoActor.png'
import styled from 'styled-components'

const CustomStyles = styled.div`
    .slick-slide {
        padding-left: 1rem;
    }
    .slick-prev {
        left: -40px;
        top: 45px;
    }
    .slick-prev::before {
        font-size: 30px;
        color: rgb(42, 153, 83);
    }
    .slick-next {
        right: -35px;
        top: 45px;
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
            right: -25px;
        }
        .slick-next::before {
            font-size: 25px;
        }
    }
    @media (max-width: 768px) {
        .slick-slide {
            padding-left: 1rem;
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
            padding-left: 0;
        }
        .slick-prev {
            left: -15px;
        }
        .slick-next {
            right: -15px;
        }
    }
`

const CastSlider = ({ data }: { data: CastEntryType | undefined }) => {
    let settings = {
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 8,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 7
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1220,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
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
            <Slider {...settings} className={styles.CastSlider}>
                {data?.cast?.edges?.map((e) => (
                    <div key={data.id}>
                        <div className={styles.Slide}>
                            <div
                                className={styles.Actor}
                                style={{
                                    backgroundImage: `url(${e.node.name.primaryImage?.url}), url(${castDummy})`,
                                    backgroundSize: 'cover',
                                    borderRadius: '50%'
                                }}
                            />
                            <div className="flex flex-col ml-3 font-medium">
                                <h3 className="text-slate-100 w-full">
                                    {e.node?.name?.nameText?.text}
                                </h3>
                                {e.node.characters?.map((c, index) => (
                                    <p
                                        key={index}
                                        className="text-slate-400 w-24"
                                    >
                                        {c.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </CustomStyles>
    )
}

export default CastSlider
