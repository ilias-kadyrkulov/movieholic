import Slider from 'react-slick'
import styles from './CastSlider.module.scss'
import { CastEntryType } from '../../api/titles.api'

const CastSlider = ({ data }: { data: CastEntryType | undefined }) => {
    let settings = {
        arrows: true,
        infinite: false,
        speed: 600,
        slidesToShow: 6,
        slidesToScroll: 2,
        rows: 1
    }
    console.log(data)

    return (
        <Slider {...settings} className={styles.CastSlider}>
            {data?.cast?.edges.map((e) => (
                <div key={data.id}>
                    <div className="flex">
                        <img
                            className="rounded-full w-16 h-16"
                            src={e.node.name.primaryImage.url}
                        />
                        <div className="flex flex-col ml-3 font-medium">
                            <h3 className='text-slate-100'>{e.node.name.nameText.text}</h3>
                            {e.node.characters.map((c, index) => (
                                <span key={index} className='text-slate-400'>{c.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default CastSlider
