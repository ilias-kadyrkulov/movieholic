import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import styles from './BigSlider.module.scss'
import styled from 'styled-components'
import { TopRatedSeriesEntryType } from '../../../api/show/titles.api'
import GreenButton from '../../../common/Buttons/GreenButton/GreenButton'
import MovieWatchlistButton from '../../../common/Buttons/MovieWatchlistButton/MovieWatchlistButton'
import { useAppSelector } from '../../../hooks/hooks'
import WatchTrailerButton from '../../../common/Buttons/WatchTraillerButton/WatchTrailerButton'
import { GetNowPlayingMoviesType } from '../../../api/tmdbV3/movieLists.api'
import { useGetMovieGenresQuery } from '../../../api/tmdbV3/genres.api'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'

type PropsType = {
  topRatedSeries: TopRatedSeriesEntryType[] | undefined
  nowPlayingMovies: GetNowPlayingMoviesType | undefined
}

const CustomDots = styled.div`
  .slick-dots {
    bottom: 0.5rem;
    left: 65px;

    li {
      button::before {
        font-size: 12px;
        color: #fff;
      }
    }
  }
  @media (max-width: 1024px) {
    .slick-dots {
      left: 25px;
    }
  }
  @media (max-width: 768px) {
    .slick-prev {
      left: 15px;
    }
    .slick-next {
      right: 15px;
    }
    .slick-prev::before {
      left: 15px;
      font-size: 25px;
      color: rgb(42, 153, 83);
    }
    .slick-next::before {
      right: 15px;
      font-size: 25px;
      color: rgb(42, 153, 83);
    }
  }
`

export const BigSlider = (props: PropsType) => {
  const { data: genresData } = useGetMovieGenresQuery(undefined)

  const genreObj = genresData?.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name
    return acc
  }, {} as Record<number, string>)

  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  const tmdbAccount = useAppSelector((state) => state.tmdbAccount.username)

  let settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => <ul style={{ display: 'flex' }}> {dots} </ul>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          dots: false,
        },
      },
    ],
  }
  // let sSettings = {
  //     infinite: false,
  //     swipe: false,
  //     speed: 500,
  //     slidesToShow: 9,
  //     slidesToScroll: 1
  // }

  return (
    <>
      <CustomDots>
        <Slider {...settings} className={styles.Carousel}>
          {/* {props.topRatedSeries?.map((s) => (
                        <div key={s.id} className={styles.Slide}>
                            <div
                                className={`bg-cover bg-no-repeat bg-center h-full`}
                                style={{
                                    backgroundImage: `url(${s.primaryImage.url})`
                                }}
                            >
                                <div className={styles.Details}>
                                    <h3 className="text-4xl text-slate-200 font-bold">
                                        {s.titleText.text}
                                    </h3>
                                    <div>
                                        <p className="font-bold text-slate-400">
                                            Episode duration:{' '}
                                            {s.runtime.seconds / 60}min
                                        </p>
                                        <span className="font-bold text-slate-400">
                                            {s.releaseYear.year} •{' '}
                                        </span>
                                        {s.genres.genres.map((g) => (
                                            <span
                                                className="font-bold text-slate-400 mr-1"
                                                key={g.id}
                                            >
                                                {g.text} •
                                            </span>
                                        ))}
                                    </div>
                                    <p className="font-medium text-gray-300">
                                        {s.plot.plotText.plainText}
                                    </p>
                                    <div className={styles.Buttons}>
                                        <GreenButton text="Watch" id={s.id} />
                                        <WatchTrailerButton
                                            id={s.id}
                                            text="Watch Trailer"
                                        />
                                        {user && !watchList.includes(s.id) && (
                                            <MovieWatchlistButton
                                                text="Add to Watchlist"
                                                id={s.id}
                                            />
                                        )}
                                        {user && watchList.includes(s.id) && (
                                            <MovieWatchlistButton
                                                text="Remove from Watchlist"
                                                id={s.id}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} */}

          {props.nowPlayingMovies?.results.map((m) => (
            <div key={m.id} className={styles.Slide}>
              <div
                className={`bg-cover bg-no-repeat bg-center h-full`}
                style={{
                  backgroundImage: `url(${tmdbApiConfig.originalImage(m.poster_path)})`,
                }}
              >
                <div className={styles.Details}>
                  <h3 className="text-2xl text-slate-200 font-bold">{m.original_title}</h3>
                  <div>
                    <span className="font-bold text-slate-400">{m.release_date} • </span>
                    {genreObj &&
                      m.genre_ids.map((genreId) => (
                        <span key={genreId} className="font-bold text-slate-400 mr-1">
                          {genreObj[genreId]}
                        </span>
                      ))}
                  </div>
                  <p
                    className="font-medium text-gray-300 text-sm"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: '3',
                      overflow: 'hidden',
                    }}
                  >
                    {m.overview}
                  </p>
                  <div className={styles.Buttons}>
                    <GreenButton text="Watch" tmdbId={m.id} />
                    <WatchTrailerButton tmdbId={m.id} text="Watch Trailer" />
                    {tmdbAccount &&
                    movieWatchlist &&
                    movieWatchlist.find((item) => m.id === item.id) ? (
                      <MovieWatchlistButton text="Remove from Watchlist" tmdbId={m.id} />
                    ) : (
                      <MovieWatchlistButton text="Add to Watchlist" tmdbId={m.id} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </CustomDots>
      {/* <div className={styles.Inner}>
                <Slider {...sSettings} className={styles.MiniCarousel}>
                    <div>
                        <img src={disneyIcon} />
                    </div>
                    <div>
                        <img src={hboIcon} />
                    </div>
                    <div>
                        <img src={netflixIcon} />
                    </div>
                    <div>
                        <img src={disneyIcon} />
                    </div>
                    <div>
                        <img src={hboIcon} />
                    </div>
                    <div>
                        <img src={netflixIcon} />
                    </div>
                    <div>
                        <img src={disneyIcon} />
                    </div>
                    <div>
                        <img src={hboIcon} />
                    </div>
                </Slider>
            </div> */}
    </>
  )
}
