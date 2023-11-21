import { useContext } from 'react'
import { GrBookmark } from 'react-icons/gr'
import styles from './TransparrentButton.module.scss'
import {
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    query,
    where
} from 'firebase/firestore'
import { db } from '../../../firebase'
import { useActions } from '../../../hooks/useActions'
import { UserContext } from '../../../App'

const TransparrentButton = ({
    text,
    tmdbId
}: {
    text: 'Add to Watchlist' | 'Remove from Watchlist'
    tmdbId: number | undefined
}) => {
    const watchlistCollectionRef = collection(db, 'watchList')

    const user = useContext(UserContext)

    const { deleteShowById } = useActions()

    const handleAddToWatchlist = async () => {
        //NOTE - Adding a doc with userId and showId fields
        await addDoc(watchlistCollectionRef, {
            userId: user?.uid,
            showId: tmdbId
        })
    }

    const handleRemoveFromWatchlist = async () => {
        //NOTE - Searching for document with certain showId
        const q = query(
            watchlistCollectionRef,
            where('userId', '==', user?.uid),
            where('showId', '==', tmdbId)
        )
        const querySnapshot = await getDocs(q)

        //NOTE - Deleting a found document
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref)
        })

        deleteShowById(tmdbId)
    }

    return (
        <>
            {text === 'Add to Watchlist' && (
                <button
                    className={styles.TransparrentButton}
                    onClick={handleAddToWatchlist}
                >
                    <GrBookmark />
                    <span>{text}</span>
                </button>
            )}
            {text === 'Remove from Watchlist' && (
                <button
                    className={styles.TransparrentButton}
                    onClick={handleRemoveFromWatchlist}
                >
                    <GrBookmark />
                    <span>{text}</span>
                </button>
            )}
        </>
    )
}

export default TransparrentButton
