import { useParams } from 'react-router-dom'
import styles from './MoviePage.module.scss'
import WatchlistButton from '../../common/Buttons/WatchlistButton/WatchlistButton'
import DownloadButton from '../../common/Buttons/DownloadButton/DownloadButton'
import ShareButton from '../../common/Buttons/ShareButton/ShareButton'
import LikeButton from '../../common/Buttons/LikeButton/LikeButton'
import CastSlider from '../Sliders/CastSlider/CastSlider'
import { useAppSelector } from '../../hooks/hooks'
import { useGetFileListQuery } from '../../api/filemoon/file.api'
import { useActions } from '../../hooks/useActions'
import WatchTrailerButton from '../../common/Buttons/WatchTrailerButton/WatchTrailerButton'
import { RotatingLines } from 'react-loader-spinner'
import {
  useGetCastDetailsByMovieIdQuery,
  useGetMovieDetailsByMovieIdQuery,
} from '../../api/tmdbV3/movies.api'
import { tmdbApiConfig } from '../../api/tmdbV3/tmdb.api'
import { skipToken } from '@reduxjs/toolkit/query'
import ShowPagePlayButton from '../../common/Buttons/PlayContinueButton/ShowPagePlayButton'

const MoviePage = () => {
  const { id } = useParams<{ id: string }>()
  const { fileListReceived } = useActions()

  const { fileList } = useAppSelector((state) => state.player)
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const movieGenres = useAppSelector((state) => state.movieGenres)
  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)

  const { data: movieDetails, isFetching } = useGetMovieDetailsByMovieIdQuery({
    movieId: Number(id ?? skipToken),
  })

  const { data: movieCastDetails } = useGetCastDetailsByMovieIdQuery({
    movieId: Number(id),
  })

  const { fileListData } = useGetFileListQuery(movieDetails?.title, {
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
        className={styles.Movie}
        style={{
          backgroundImage: `url(${tmdbApiConfig.originalImage(movieDetails?.backdrop_path)})`,
        }}
      />
      <div className={styles.Details}>
        <h3 className="text-4xl text-slate-200 font-semibold">{movieDetails?.title}</h3>
        <div className="my-3">
          <p className="font-semibold text-slate-300">{movieDetails?.runtime} min</p>

          <span className="font-semibold text-slate-300">{movieDetails?.release_date} • </span>
          {movieDetails?.genres.map((g) => (
            <span className="font-semibold text-slate-300 mr-1" key={g.id}>
              {movieGenres && movieGenres[g.id]}
            </span>
          ))}
        </div>

        <div className={styles.Buttons}>
          <div className="flex mr-10 flex-wrap">
            <ShowPagePlayButton
              text="Play now"
              titleType={'movie'}
              titleText={movieDetails?.title}
            />
            <WatchTrailerButton text="Watch Trailer" tmdbId={movieDetails?.id} />
            {tmdbAccount &&
            movieWatchlist &&
            movieWatchlist.find((item) => movieDetails?.id === item.id) ? (
              <WatchlistButton
                text="Remove from Watchlist"
                tmdbId={movieDetails?.id}
                titleType="movie"
              />
            ) : (
              <WatchlistButton
                text="Add to Watchlist"
                tmdbId={movieDetails?.id}
                titleType="movie"
              />
            )}
          </div>
          <div className={styles.Right}>
            <DownloadButton />
            <ShareButton />
            <LikeButton tmdbId={movieDetails?.id} />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-white mb-3 mt-12">Story Line</h2>
          <p className="font-medium text-gray-300">{movieDetails?.overview}</p>
        </div>
        <div>
          <h2 className="font-semibold text-white mb-3 mt-4">Cast</h2>
          <CastSlider data={movieCastDetails?.cast} />
        </div>
      </div>
    </>
  )
}

export default MoviePage
