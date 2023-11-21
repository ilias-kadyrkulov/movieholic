import WatchListSlider from '../../../components/Sliders/WatchListSlider/WatchListSlider'
import {
    collection,
    // getDocs,
    onSnapshot,
    query,
    where
} from 'firebase/firestore'
import { db } from '../../../firebase'
import { useActions } from '../../../hooks/useActions'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../../App'

export const WatchList = () => {
    const collectionRef = collection(db, 'watchList')

    const { watchListReceived } = useActions()

    const user = useContext(UserContext)
    
    // const getData = () => {
    //     getDocs(collectionRef).then((response) => {
    //         response.docs.map((item) => item.data())
    //     })
    // }
    
    useEffect(() => {
        const queryTest = query(collectionRef, where('userId', '==', user?.uid))

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
