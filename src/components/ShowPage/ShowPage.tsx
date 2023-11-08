import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import {
    useGetCastInfoQuery,
    useGetShowInfoByIdQuery
} from '../../api/show/titles.api'
import styles from './ShowPage.module.scss'
import TransparrentButton from '../../common/Buttons/TransparrentButton/TransparrentButton'
import PlayContinueButton from '../../common/Buttons/PlayContinueButton/PlayContinueButton'
import DownloadButton from '../../common/Buttons/DownloadButton/DownloadButton'
import ShareButton from '../../common/Buttons/ShareButton/ShareButton'
import LikeButton from '../../common/Buttons/LikeButton/LikeButton'
import CastSlider from '../Sliders/CastSlider/CastSlider'
import { useAppSelector } from '../../hooks/hooks'
import { UserContext } from '../../App'
import EpisodeSlider from '../EpisodeSlider/EpisodeSlider'
import { useGetFileListQuery } from '../../api/filemoon/file.api'
import { useActions } from '../../hooks/useActions'
import WatchTrailerButton from '../../common/Buttons/WatchTraillerButton/WatchTrailerButton'

const ShowPage = () => {
    const { id } = useParams<{ id?: string }>()
    const { fileListReceived, showBeenClicked } = useActions()

    const { fileList } = useAppSelector((state) => state.player)
    const watchList = useAppSelector((state) => state.watchList)

    const { show } = useGetShowInfoByIdQuery(id, {
        selectFromResult: ({ data }) => ({
            show: data?.results
        })
    })
    if (show) {
        showBeenClicked({
            title: show.originalTitleText.text,
            titleType: show.titleType.text,
            episodes: show.episodes?.episodes.total
        })
    }

    const { cast } = useGetCastInfoQuery(id, {
        selectFromResult: ({ data }) => ({
            cast: data?.results
        })
    })

    const { fileListData } = useGetFileListQuery(show?.originalTitleText.text, {
        selectFromResult: ({ data }) => ({
            fileListData: data?.result.files
        })
    })
    console.log(fileListData)

    if (fileListData && fileListData.length > 0) {
        const sortedFileListData = fileListData.slice().sort((a, b) =>
            a.title.localeCompare(b.title, undefined, {
                sensitivity: 'base'
            })
        )

        if (!fileList?.length) {
            fileListReceived(sortedFileListData)
        }
    }

    const user = useContext(UserContext)

    return (
        <div>
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
                            <PlayContinueButton text="Play now" id={show?.id} titleType={show?.titleType.text} titleText={show?.titleText.text} />
                            <WatchTrailerButton text="Watch Trailer" id={show?.id} />
                            {user && show && !watchList.includes(show.id) && (
                                <TransparrentButton
                                    text="Add to Watchlist"
                                    id={show.id}
                                />
                            )}
                            {user && show && watchList.includes(show.id) && (
                                <TransparrentButton
                                    text="Remove from Watchlist"
                                    id={show.id}
                                />
                            )}
                        </div>
                        <div className="flex">
                            <DownloadButton />
                            <ShareButton />
                            <LikeButton showId={show?.id} />
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
                    {show?.titleType.text === 'TV Series' ? (
                        <div>
                            <div className="flex justify-between items-center text-slate-100 font-bold">
                                <h3 className="text-2xl my-5">1-9 Episode</h3>
                                <p className="text-sm">Season 1</p>
                            </div>
                            <EpisodeSlider titleText={show.titleText.text} fileList={fileList} />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowPage
