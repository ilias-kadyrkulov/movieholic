import { useParams } from 'react-router-dom'
import styles from './MoviePage.module.scss'
import MovieWatchlistButton from '../../common/Buttons/MovieWatchlistButton/MovieWatchlistButton'
import PlayContinueButton from '../../common/Buttons/PlayContinueButton/PlayContinueButton'
import DownloadButton from '../../common/Buttons/DownloadButton/DownloadButton'
import ShareButton from '../../common/Buttons/ShareButton/ShareButton'
import LikeButton from '../../common/Buttons/LikeButton/LikeButton'
import CastSlider from '../Sliders/CastSlider/CastSlider'
import { useAppSelector } from '../../hooks/hooks'
import { useGetFileListQuery } from '../../api/filemoon/file.api'
import { useActions } from '../../hooks/useActions'
import WatchTrailerButton from '../../common/Buttons/WatchTraillerButton/WatchTrailerButton'
import { RotatingLines } from 'react-loader-spinner'
import { useGetMovieDetailsByMovieIdQuery } from '../../api/tmdbV3/movies.api'
import { tmdbApiConfig } from '../../api/tmdbV3/tmdb.api'
import { useGetMovieGenresQuery } from '../../api/tmdbV3/genres.api'
import { skipToken } from '@reduxjs/toolkit/query'

const MoviePage = () => {
  const { id } = useParams<{ id: string }>()
  const { fileListReceived } = useActions()

  const { fileList } = useAppSelector((state) => state.player)
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)

  const { data: movieDetails, isLoading } = useGetMovieDetailsByMovieIdQuery({
    movieId: Number(id ?? skipToken),
  })

  const { data: genresData } = useGetMovieGenresQuery(undefined)

  const genreObj = genresData?.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name
    return acc
  }, {} as Record<number, string>)

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
      {isLoading && (
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
      ></div>
      <div className={styles.Details}>
        <h3 className="text-4xl text-slate-200 font-bold">{movieDetails?.original_title}</h3>
        <div className="my-3">
          <p className="font-bold text-slate-400">{movieDetails?.runtime} min</p>

          <span className="font-bold text-slate-400">{movieDetails?.release_date} • </span>
          {movieDetails?.genres.map((g) => (
            <span className="font-bold text-slate-400 mr-1" key={g.id}>
              {genreObj && genreObj[g.id]}
            </span>
          ))}
        </div>

        <div className={styles.Buttons}>
          <div className="flex mr-10 flex-wrap">
            <PlayContinueButton
              text="Play now"
              tmdbId={movieDetails?.id}
              titleType={'movie'}
              titleText={movieDetails?.original_title}
            />
            <WatchTrailerButton text="Watch Trailer" tmdbId={movieDetails?.id} />
            {tmdbAccount && movieWatchlist && movieWatchlist.find((item) => movieDetails?.id === item.id) ? (
              <MovieWatchlistButton text="Remove from Watchlist" tmdbId={movieDetails?.id} />
            ) : (
              <MovieWatchlistButton text="Add to Watchlist" tmdbId={movieDetails?.id} />
            )}
          </div>
          <div className={styles.Right}>
            <DownloadButton />
            <ShareButton />
            <LikeButton showId={movieDetails?.id} />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-white mb-3 mt-12">Story Line</h2>
          <p className="font-medium text-gray-300">{movieDetails?.overview}</p>
        </div>
        <div>
          <h2 className="font-bold text-white mb-3 mt-4">Cast</h2>
          <CastSlider />
        </div>
      </div>
    </>
  )
}

export default MoviePage
