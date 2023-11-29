import { BiLike } from 'react-icons/bi'
import styles from './LikeButton.module.scss'
import { useActions } from '../../../hooks/useActions'
import { useAppSelector } from '../../../hooks/hooks'
import { useMovieFavoriteMutation, useTvFavoriteMutation } from '../../../api/tmdbV3/account.api'

const LikeButton = ({
  tmdbId,
  titleType,
}: {
  tmdbId?: number | undefined
  titleType: 'movie' | 'tv'
}) => {
  const { showGotLiked, showGotUnliked } = useActions()

  const [manipulateMovieFavorite] = useMovieFavoriteMutation()
  const [manipulateTVFavorite] = useTvFavoriteMutation()

  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)
  const likeList = useAppSelector((state) => state.likeList)

  const handleAddMovieToFavorite = async () => {
    const result = await manipulateMovieFavorite({
      mediaId: tmdbId,
      boolean: true,
      session_id: sessionId,
    })
    console.log(result)

    showGotLiked(tmdbId)
  }

  const handleRemoveMovieFromFavorite = async () => {
    const result = await manipulateMovieFavorite({
      mediaId: tmdbId,
      boolean: false,
      session_id: sessionId,
    })
    console.log(result)

    showGotUnliked(tmdbId)
  }

  const handleAddTVToFavorite = async () => {
    const result = await manipulateTVFavorite({
      mediaId: tmdbId,
      boolean: true,
      session_id: sessionId,
    })
    console.log(result)

    showGotLiked(tmdbId)
  }

  const handleRemoveTVFromFavorite = async () => {
    const result = await manipulateTVFavorite({
      mediaId: tmdbId,
      boolean: false,
      session_id: sessionId,
    })
    console.log(result)

    showGotUnliked(tmdbId)
  }

  return (
    <>
      {titleType === 'movie' && tmdbId && !likeList.find((item) => item === tmdbId) && (
        <button className={styles.UnlikedButton} onClick={handleAddMovieToFavorite}>
          <BiLike />
          <span>Like</span>
        </button>
      )}
      {titleType === 'movie' && tmdbId && likeList.find((item) => item === tmdbId) && (
        <button className={styles.LikedButton} onClick={handleRemoveMovieFromFavorite}>
          <BiLike />
          <span>Liked</span>
        </button>
      )}
      {titleType === 'tv' && tmdbId && !likeList.find((item) => item === tmdbId) && (
        <button className={styles.UnlikedButton} onClick={handleAddTVToFavorite}>
          <BiLike />
          <span>Like</span>
        </button>
      )}
      {titleType === 'tv' && tmdbId && likeList.find((item) => item === tmdbId) && (
        <button className={styles.LikedButton} onClick={handleRemoveTVFromFavorite}>
          <BiLike />
          <span>Liked</span>
        </button>
      )}
    </>
  )
}

export default LikeButton
