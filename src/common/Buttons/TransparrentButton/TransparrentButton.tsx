import { GrBookmark } from 'react-icons/gr'
import styles from './TransparrentButton.module.scss'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where
} from 'firebase/firestore'
import { db } from '../../../firebase'
import { useAppSelector } from '../../../hooks/hooks'
import { useActions } from '../../../hooks/useActions'

const TransparrentButton = ({
    text,
    id
}: {
    text: 'Add to Watchlist' | 'Remove from Watchlist'
    id: string | undefined
}) => {
    const collectionRef = collection(db, 'collection')

    const { uid } = useAppSelector((state) => state.user)

    const { deleteShowById } = useActions()

    const handleAddToWatchlist = async () => {
        //NOTE - Adding a doc with userId and showId fields
        await addDoc(collectionRef, {
            userId: uid,
            showId: id
        })
    }

    const handleRemoveFromWatchlist = async () => {
        //NOTE - Searching for document with certain showId
        const q = query(
            collectionRef,
            where('userId', '==', uid),
            where('showId', '==', id)
        )
        const querySnapshot = await getDocs(q)

        //NOTE - Deleting a found document
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref)
        })

        deleteShowById(id)
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
