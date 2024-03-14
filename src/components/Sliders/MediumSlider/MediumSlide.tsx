import { forwardRef } from 'react'
import { useAppSelector } from '@/hooks/hooks'
import { AiFillStar } from 'react-icons/ai'
import styles from './MediumSlider.module.scss'

type TProps = {
    imageSrc?: string

    title: string
    vote_average: number
    genre_ids: number[]
}

export const MediumSlide = forwardRef<any, TProps>(
    ({ imageSrc, ...props }, ref) => {
        const movieGenres = useAppSelector(state => state.movieGenres)
        console.log(ref, imageSrc)

        return (
            <div ref={ref} className={styles.MovieCard}>
                <img src={imageSrc} />
                <div className={styles.MovieDetails}>
                    <h2 className='font-semibold text-base text-white mb-2 h-14'>
                        {props.title}
                    </h2>
                    <div className='flex max-w-full'>
                        <div className='flex'>
                            <AiFillStar />
                            <div className='font-semibold text-sm mx-2 text-white'>
                                {props.vote_average}
                            </div>
                        </div>
                        <div className='relative flex max-w-full w-10/12'>
                            <div className={styles.Genres}>
                                {movieGenres &&
                                    props.genre_ids?.map(g => (
                                        <span key={g}>{movieGenres[g]}</span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)
