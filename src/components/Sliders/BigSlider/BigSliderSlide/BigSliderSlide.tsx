import { forwardRef } from 'react'
import { useAppSelector } from '@/hooks/hooks'
import { NowPlayingMovieType } from '@/types/movie.types'
import GreenButton from '@/common/Buttons/GreenButton/GreenButton'
import WatchlistButton from '@/common/Buttons/WatchlistButton/WatchlistButton'
import WatchTrailerButton from '@/common/Buttons/WatchTrailerButton/WatchTrailerButton'
import styles from '../BigSlider.module.scss'

export const BigSliderSlide = forwardRef<any, NowPlayingMovieType>(
    ({ imageSrc, ...props }, ref) => {
        const movieWatchlist = useAppSelector(state => state.movieWatchlist)
        const movieGenres = useAppSelector(state => state.movieGenres)
        const tmdbAccount = useAppSelector(state => state.tmdbAccount.username)

        return (
            <div
                ref={ref}
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%'
                }}
            >
                <div className={styles.Details}>
                    <h3 className='text-2xl text-slate-200 font-semibold'>
                        {props.title}
                    </h3>
                    <div>
                        <span className='font-semibold text-slate-400'>
                            {props.release_date} •{' '}
                        </span>
                        {movieGenres &&
                            props.genre_ids.map(genreId => (
                                <span
                                    key={genreId}
                                    className='font-semibold text-slate-400 mr-1'
                                >
                                    {movieGenres[genreId]}
                                </span>
                            ))}
                    </div>
                    <p
                        className='font-medium text-gray-300 text-sm'
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: '3',
                            overflow: 'hidden'
                        }}
                    >
                        {props.overview}
                    </p>
                    <div className={styles.Buttons}>
                        <GreenButton
                            text='Watch'
                            tmdbId={props.id}
                        />
                        <WatchTrailerButton
                            tmdbId={props.id}
                            text='Watch Trailer'
                        />
                        {movieWatchlist.find(item => props.id === item) ? (
                            <WatchlistButton
                                text='Remove from Watchlist'
                                tmdbId={props.id}
                                titleType='movie'
                            />
                        ) : (
                            <WatchlistButton
                                text='Add to Watchlist'
                                tmdbId={props.id}
                                tmdbAcc={tmdbAccount}
                                titleType='movie'
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
)
