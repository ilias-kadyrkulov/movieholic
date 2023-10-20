import { useParams } from 'react-router-dom'
import {
    useGetCastInfoQuery,
    useGetShowInfoByIdQuery
} from '../../api/titles.api'
import styles from './ShowPage.module.scss'
import TransparrentButton from '../../common/Buttons/TransparrentButton/TransparrentButton'
import PlayContinueButton from '../../common/Buttons/PlayContinueButton/PlayContinueButton'
import DownloadButton from '../../common/Buttons/DownloadButton/DownloadButton'
import ShareButton from '../../common/Buttons/ShareButton/ShareButton'
import LikeButton from '../../common/Buttons/LikeButton/LikeButton'
import CastSlider from '../CastSlider/CastSlider'

const ShowPage = () => {
    const { id } = useParams<{ id?: string }>()

    const { show } = useGetShowInfoByIdQuery(id, {
        selectFromResult: ({ data }) => ({
            show: data?.results
        })
    })
    console.log(show)

    const { cast } = useGetCastInfoQuery(id, {
        selectFromResult: ({ data }) => ({
            cast: data?.results
        })
    })

    return (
        <div
            className={styles.Show}
            style={{
                backgroundImage: `url(${show?.primaryImage.url})`
            }}
        >
            <div className={styles.Details}>
                <h3 className="text-4xl text-slate-200 font-bold">
                    {show?.originalTitleText.text}
                </h3>
                <div className="my-3">
                    {show?.titleType.text === 'TV Series' ? (
                        <p className="font-bold text-slate-400">
                            {show?.episodes?.episodes.total} Episodes
                        </p>
                    ) : (
                        <p className="font-bold text-slate-400">
                            {
                                show?.runtime?.displayableProperty?.value
                                    .plainText
                            }
                        </p>
                    )}

                    <span className="font-bold text-slate-400">
                        {show?.releaseYear.year} •{' '}
                    </span>
                    {show?.genres.genres.map((g) => (
                        <span
                            className="font-bold text-slate-400 mr-1"
                            key={g.id}
                        >
                            {g.text} •
                        </span>
                    ))}
                </div>

                <div className={styles.Buttons}>
                    <div className="flex">
                        <PlayContinueButton text="Watch Trailer" />
                        <TransparrentButton text="Add To Watchlist" />
                    </div>
                    <div className="flex">
                        <DownloadButton />
                        <ShareButton />
                        <LikeButton />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-white mb-3 mt-12">
                        Story Line
                    </h2>
                    <p className="font-medium text-gray-300">
                        {show?.plot.plotText.plainText}
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-white mb-3 mt-4">Cast</h2>
                    <CastSlider data={cast} />
                </div>
            </div>
        </div>
    )
}

export default ShowPage
