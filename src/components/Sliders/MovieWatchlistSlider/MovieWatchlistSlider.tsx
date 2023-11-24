import Slider from 'react-slick'
import styles from './MovieWatchlistSlider.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGetMoviesWatchlistQuery } from '../../../api/tmdbV3/account.api'
import { useAppSelector } from '../../../hooks/hooks'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'
import { useGetMovieGenresQuery } from '../../../api/tmdbV3/genres.api'
import { useEffect } from 'react'
import { useActions } from '../../../hooks/useActions'

const CustomStyles = styled.div`
  .slick-slide {
    padding-left: 2rem;
  }
  .slick-prev {
    left: -45px;
    width: 40px;
    height: 40px;
  }
  .slick-prev::before {
    font-size: 30px;
    color: rgb(42, 153, 83);
  }
  .slick-next {
    right: -30px;
    width: 40px;
    height: 40px;
  }
  .slick-next::before {
    font-size: 30px;
    color: rgb(42, 153, 83);
  }

  @media (max-width: 768px) {
    .slick-prev {
      left: -15px;
    }
    .slick-next {
      right: -5px;
    }
  }
  @media (max-width: 475px) {
    .slick-prev {
      left: -5px;
    }
    .slick-next {
      right: 0px;
    }
  }
  @media (max-width: 425px) {
    .slick-slide {
      padding-left: 0rem;
    }
  }
`

const MovieWatchlistSlider = () => {
  const sessionId = useAppSelector((state) => state.tmdbSession.sessionId)
  const movieWatchlist = useAppSelector((state) => state.movieWatchlist)
  console.log(movieWatchlist)

  const { movieWatchlistReceived, movieWatchlistCleared } = useActions()

  const { data: movieWatchlistData } = useGetMoviesWatchlistQuery({
    session_id: sessionId,
  })
  const { data: genresData } = useGetMovieGenresQuery()

  const genreObj = genresData?.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name
    return acc
  }, {} as Record<number, string>)

  let settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  useEffect(() => {
    movieWatchlistCleared() //TODO - May be optimized? Unnecessary state cleaning?
  }, [])

  useEffect(() => {
    movieWatchlistData && movieWatchlistReceived(movieWatchlistData.results)
  }, [movieWatchlistData])

  return (
    <CustomStyles>
      <Slider {...settings} className={styles.MovieWatchlistSlider}>
        {movieWatchlist?.map((m) => (
          <Link to={`title/${m.id}`} key={m.id}>
            {m.poster_path && (
              <div className={styles.MovieCard}>
                <img src={tmdbApiConfig.w500Image(m.poster_path)} />
                <div className={styles.MovieDetails}>
                  <h2 className="font-bold text-base text-white">{m.original_title}</h2>

                  <div className={styles.Rating}>
                    <AiFillStar />
                    <div className="font-bold text-lg mx-2 text-white">{m.vote_average}</div>
                    <div className="relative">
                      <div className={styles.TitleType}>Movie</div>
                    </div>
                  </div>
                  <div className={styles.Genres}>
                    <div className="pr-1">
                      <LiaFilmSolid />
                    </div>
                    <div className="leading-3 w-full">
                      {genreObj &&
                        m.genre_ids.map((g) => (
                          <span className="font-bold text-slate-400 mr-1" key={g}>
                            {genreObj[g]}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Link>
        ))}
      </Slider>
    </CustomStyles>
  )
}

export default MovieWatchlistSlider
