import Slider from 'react-slick'
import styles from './CastSlider.module.scss'
import { CastEntryType } from '../../../api/show/titles.api'
import castDummy from '../../../assets/noPhotoActor.png'

const CastSlider = ({ data }: { data: CastEntryType | undefined }) => {
    let settings = {
        arrows: true,
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 4,
        rows: 1
    }

    return (
        <Slider {...settings} className={styles.CastSlider}>
            {data?.cast?.edges?.map((e) => (
                <div key={data.id}>
                    <div className="flex">
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
                                <p key={index} className="text-slate-400 w-24">
                                    {c.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default CastSlider
