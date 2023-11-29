import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './SeriesPage.module.scss'
import WatchlistButton from '../../common/Buttons/WatchlistButton/WatchlistButton'
import DownloadButton from '../../common/Buttons/DownloadButton/DownloadButton'
import ShareButton from '../../common/Buttons/ShareButton/ShareButton'
import LikeButton from '../../common/Buttons/LikeButton/LikeButton'
import CastSlider from '../Sliders/CastSlider/CastSlider'
import { useAppSelector } from '../../hooks/hooks'
import EpisodeSlider from '../EpisodeSlider/EpisodeSlider'
import { useGetFileListQuery } from '../../api/filemoon/file.api'
import { useActions } from '../../hooks/useActions'
import WatchTrailerButton from '../../common/Buttons/WatchTrailerButton/WatchTrailerButton'
import { RotatingLines } from 'react-loader-spinner'
import { tmdbApiConfig } from '../../api/tmdbV3/tmdb.api'
import ShowPagePlayButton from '../../common/Buttons/PlayContinueButton/ShowPagePlayButton'
import {
  useGetCastDetailsByTVSeriesIdQuery,
  useGetTVSeriesDetailsByMovieIdQuery,
} from '../../api/tmdbV3/tvSeries.api'
import { useGetTVWatchlistQuery } from '../../api/tmdbV3/account.api'

const SeriesPage = () => {
  const { id } = useParams<{ id: string }>()
  const { fileListReceived, tvSeriesWatchlistReceived } = useActions()

  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)
  const { fileList } = useAppSelector((state) => state.player)
  const tvSeriesWatchlist = useAppSelector((state) => state.tvSeriesWatchlist)
  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)
  const tvGenres = useAppSelector((state) => state.tvGenres)

  const { data: tvSeriesDetails, isFetching } = useGetTVSeriesDetailsByMovieIdQuery({
    tvSeriesId: Number(id),
  })

  const { data: tvSeriesCastDetails } = useGetCastDetailsByTVSeriesIdQuery({
    tvSeriesId: Number(id),
  })

  const { data: tvWatchlistData } = useGetTVWatchlistQuery({
    session_id: sessionId,
  })

  const { fileListData } = useGetFileListQuery(tvSeriesDetails?.name, {
    selectFromResult: ({ data }) => ({
      fileListData: data?.result.files,
    }),
  })
  console.log(fileListData)

  if (fileListData && fileListData.length > 0) {
    const sortedFileListData = fileListData.slice().sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        sensitivity: 'base',
      }),
    )

    if (!fileList?.length) {
      fileListReceived(sortedFileListData)
    }
  }

  useEffect(() => {
    tvWatchlistData && tvSeriesWatchlistReceived(tvWatchlistData.results.map((item) => item.id))
  }, [tvWatchlistData])

  return (
    <>
      {isFetching && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="100"
            visible={true}
          />
        </div>
      )}
      <div
        className={styles.TVSeries}
        style={{
          backgroundImage: `url(${tmdbApiConfig.originalImage(tvSeriesDetails?.backdrop_path)})`,
        }}
      />
      <div className={styles.Details}>
        <h3 className="text-4xl text-slate-200 font-semibold">{tvSeriesDetails?.name}</h3>
        <div className="my-3">
          <p className="font-semibold text-slate-300">
            Episode runtime: {tvSeriesDetails?.episode_run_time.map((item) => item + '. ')} min
          </p>

          <span className="font-semibold text-slate-300">
            Since {tvSeriesDetails?.first_air_date} •{' '}
          </span>
          {tvGenres &&
            tvSeriesDetails?.genres.map((g) => (
              <span className="font-semibold text-slate-300 mr-1" key={g.id}>
                {tvGenres[g.id]}
              </span>
            ))}
        </div>

        <div className={styles.Buttons}>
          <div className="flex mr-10 flex-wrap">
            <ShowPagePlayButton
              text="Play now"
              titleType={'tv'}
              titleText={tvSeriesDetails?.name}
            />
            <WatchTrailerButton text="Watch Trailer" tmdbId={tvSeriesDetails?.id} />
            {tmdbAccount && tvSeriesWatchlist.find((item) => tvSeriesDetails?.id === item) ? (
              <WatchlistButton
                text="Remove from Watchlist"
                tmdbId={tvSeriesDetails?.id}
                titleType="tv"
              />
            ) : (
              <WatchlistButton
                text="Add to Watchlist"
                tmdbId={tvSeriesDetails?.id}
                titleType="tv"
                tmdbAcc={tmdbAccount}
              />
            )}
          </div>
          <div className={styles.Right}>
            <DownloadButton />
            <ShareButton />
            <LikeButton tmdbId={tvSeriesDetails?.id} titleType="tv" />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-white mb-3 mt-12">Story Line</h2>
          <p className="font-medium text-gray-300">{tvSeriesDetails?.overview}</p>
        </div>
        <div>
          <h2 className="font-semibold text-white mb-3 mt-4">Cast</h2>
          <CastSlider data={tvSeriesCastDetails?.cast} />
        </div>
        <div className="mb-10 mt-5">
          <div className="flex justify-between items-center text-slate-100 font-semibold mb-5">
            <h3 className="text-2xl">1-9 Episode</h3>
            <p className="text-sm">Season 1</p>
          </div>
          <EpisodeSlider titleText={tvSeriesDetails?.name} fileList={fileList} />
        </div>
      </div>
    </>
  )
}

export default SeriesPage
