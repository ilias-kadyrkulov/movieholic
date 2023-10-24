import WatchListSlider from '../../../components/WatchListSlider/WatchListSlider'
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where
} from 'firebase/firestore'
import { db } from '../../../firebase'
import { useActions } from '../../../hooks/useActions'
import { useEffect, useMemo } from 'react'
import { useAppSelector } from '../../../hooks/hooks'

export const WatchList = () => {
    const collectionRef = useMemo(() => collection(db, 'collection'), [])

    const { watchListReceived } = useActions()

    const user = useAppSelector((state) => state.user)
    
    const getData = () => {
        getDocs(collectionRef).then((response) => {
            response.docs.map((item) => item.data())
        })
    }
    
    useEffect(() => {
        const queryTest = query(collectionRef, where('userId', '==', user.uid))

        onSnapshot(queryTest, (snapshot) => {
            let arrayOfDocs = snapshot.docs.map((document) => {
                return document.data()
            })

            watchListReceived(arrayOfDocs.map((doc) => doc['showId']))
        })

    }, [collectionRef])

    return (
        <>
            <div className="font-bold text-2xl text-white mb-8">
                Your watchlist
            </div>
            <WatchListSlider />
        </>
    )
}
