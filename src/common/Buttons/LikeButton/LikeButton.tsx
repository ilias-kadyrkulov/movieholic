import { BiLike } from 'react-icons/bi'
import styles from './LikeButton.module.scss'
import { useActions } from '../../../hooks/useActions'
import { useAppSelector } from '../../../hooks/hooks'
import { useMovieFavoriteMutation } from '../../../api/tmdbV3/account.api'

const LikeButton = ({ tmdbId }: { tmdbId?: number | undefined }) => {
  const { showGotLiked, showGotUnliked } = useActions()

  const [manipulateMovieFavorite] = useMovieFavoriteMutation()

  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)
  const likeList = useAppSelector((state) => state.likeList)

  const { movieDeletedFromFavorite, movieFavoriteCleared } = useActions()

  const handleAddToFavorite = async () => {
    const result = await manipulateMovieFavorite({
      mediaId: tmdbId,
      boolean: true,
      session_id: sessionId,
    })
    console.log(result)

    showGotLiked(tmdbId)
    movieFavoriteCleared() //TODO - May be optimized? Too much operations?
  }

  const handleRemoveFromFavorite = async () => {
    const result = await manipulateMovieFavorite({
      mediaId: tmdbId,
      boolean: false,
      session_id: sessionId,
    })
    console.log(result)

    showGotUnliked(tmdbId)
    movieDeletedFromFavorite(tmdbId)
  }

  return (
    <>
      {tmdbId && !likeList.includes(tmdbId) ? (
        <button className={styles.UnlikedButton} onClick={handleAddToFavorite}>
          <BiLike />
          <span>Like</span>
        </button>
      ) : (
        <button className={styles.LikedButton} onClick={handleRemoveFromFavorite}>
          <BiLike />
          <span>Liked</span>
        </button>
      )}
    </>
  )
}

export default LikeButton
