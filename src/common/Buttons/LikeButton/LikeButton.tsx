import { BiLike } from 'react-icons/bi'
import styles from './LikeButton.module.scss'
import { useActions } from '../../../hooks/useActions'
import { useAppSelector } from '../../../hooks/hooks'

const LikeButton = ({ showId }: { showId: string | undefined }) => {
    const { showGotLiked, showGotUnliked } = useActions()

    const likeList = useAppSelector((state) => state.likeList)

    const handleLike = () => {
        showGotLiked(showId)
    }

    const handleDislike = () => {
        showGotUnliked(showId)
    }

    return (
        <>
            {showId && !likeList.includes(showId) ? (
                <button className={styles.UnlikedButton} onClick={handleLike}>
                    <BiLike />
                    <span>Like</span>
                </button>
            ) : (
                <button className={styles.LikedButton} onClick={handleDislike}>
                    <BiLike />
                    <span>Liked</span>
                </button>
            )}
        </>
    )
}

export default LikeButton
