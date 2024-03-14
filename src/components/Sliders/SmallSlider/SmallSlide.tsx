import { forwardRef } from 'react'
import { useAppSelector } from '@/hooks/hooks'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import styles from './SmallSlide.module.scss'

type TProps = {
    imageSrc?: string
    index: number

    title: string
    vote_average: number
    genre_ids: number[]
}

export const SmallSlide = forwardRef<any, TProps>(({ imageSrc, index, ...props }, ref) => {
    const movieGenres = useAppSelector(state => state.movieGenres)
    console.log(ref, imageSrc)

    return (
        <div
            ref={ref}
            className={styles.MovieCard}
        >
            <div className={styles.Number}>{index + 1}</div>
            <img src={imageSrc} />
            <div className={styles.MovieDetails}>
                <h2 className='font-medium text-sm text-white mt-2 h-10'>
                    {props.title}
                </h2>

                <div className={styles.Rating}>
                    <AiFillStar />
                    <div className='font-semibold text-sm mx-2 text-white'>
                        {props.vote_average}
                    </div>
                    <div className='relative'>
                        <div className={styles.TitleType}>Movie</div>
                    </div>
                </div>
                <div className={styles.Genres}>
                    <div>
                        <LiaFilmSolid />
                    </div>
                    <div className='leading-3 w-3/4 text-center'>
                        {movieGenres &&
                            props.genre_ids.map(g => (
                                <span key={g}>{movieGenres[g]}</span>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
})