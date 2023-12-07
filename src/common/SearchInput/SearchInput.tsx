import styles from './SearchInput.module.scss'
import { ChangeEvent, useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import {
  useLazySearchForMovieQuery,
  useLazySearchForMultiQuery,
  useLazySearchForPersonQuery,
  useLazySearchForTVQuery,
} from '../../api/tmdbV3/search.api'
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineManageSearch } from 'react-icons/md'
import { LiaFilmSolid } from 'react-icons/lia'
import { useAppSelector } from '../../hooks/hooks'
import { tmdbApiConfig } from '../../api/tmdbV3/tmdb.api'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

type PropsType = {
  handleSearchOnClick: () => void
  isSearchOpen: boolean
}

type ChosenType = 'All' | 'Movies' | 'TV Series' | 'Person'

const SearchInput = ({ handleSearchOnClick, isSearchOpen }: PropsType) => {
  const [search, setSearch] = useState('')
  const [searchForMulti, { data: multiSearchData, isFetching: isMultiLoading }] =
    useLazySearchForMultiQuery()
  const [searchForMovie, { data: movieSearchData, isFetching: isMovieLoading }] =
    useLazySearchForMovieQuery()
  const [searchForTVSeries, { data: tvSearchData, isFetching: isTVLoading }] =
    useLazySearchForTVQuery()
  const [searchForPerson, { data: personSearchData, isFetching: isPersonLoading }] =
    useLazySearchForPersonQuery()

  const [chosenType, setChosenType] = useState<ChosenType>('All')

  const movieGenres = useAppSelector((state) => state.movieGenres)

  const searchQuery = (i: ChangeEvent<HTMLInputElement>) => setSearch(i.target.value)
  const debouncedOnChange = debounce(searchQuery, 700)

  const handleChosenType = (type: ChosenType) => () => {
    setChosenType(type)
  }

  useEffect(() => {
    chosenType === 'All' && searchForMulti({ query: search })
    chosenType === 'Movies' && searchForMovie({ query: search })
    chosenType === 'TV Series' && searchForTVSeries({ query: search })
    chosenType === 'Person' && searchForPerson({ query: search })
  }, [search, chosenType])

  return (
    <>
      {isSearchOpen && <div className={styles.Overlay} onClick={handleSearchOnClick}></div>}
      <div className={styles.Search}>
        <div className="mx-4 mt-4">
          {isMultiLoading || isMovieLoading || isPersonLoading || isTVLoading ? (
            <div className="absolute top-7 left-6">
              <Oval
                height={20}
                width={20}
                color="#94a3b8"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <div className={styles.SearchIcon}>
              <AiOutlineSearch />
            </div>
          )}
          <input type="text" onChange={debouncedOnChange} />
        </div>
        <div className={styles.ShowType}>
          <button
            className={chosenType === 'All' ? styles.active : ''}
            onClick={handleChosenType('All')}
          >
            All
          </button>
          <button
            className={chosenType === 'Movies' ? styles.active : ''}
            onClick={handleChosenType('Movies')}
          >
            Movies
          </button>
          <button
            className={chosenType === 'TV Series' ? styles.active : ''}
            onClick={handleChosenType('TV Series')}
          >
            TV Series
          </button>
          <button
            className={chosenType === 'Person' ? styles.active : ''}
            onClick={handleChosenType('Person')}
          >
            People
          </button>
        </div>
        {!search ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className={styles.NoSearchQueryIcon}>
              <MdOutlineManageSearch />
            </div>
            <h2 className="text-slate-300 text-xs">Start typing to search...</h2>
          </div>
        ) : (
          <div className={styles.SearchResults}>
            {chosenType === 'All' &&
              multiSearchData?.results.map((i) => (
                <>
                  {i.media_type === 'movie' && (
                    <Link to={`/title/movie/${i.id}`} onClick={handleSearchOnClick}>
                      <div className="flex justify-center mt-5">
                        <img src={tmdbApiConfig.w500Image(i.poster_path)} />
                      </div>
                      <h2 className="font-semibold text-base text-slate-200 mt-3 text-center px-2 h-20">
                        {i.title}
                      </h2>
                      <div className={styles.Rating}>
                        <AiFillStar />
                        <div className="font-semibold text-base mx-2 text-slate-200">
                          {i.vote_average}
                        </div>
                        <div className="relative">
                          <div className={styles.TitleType}>{i.media_type}</div>
                        </div>
                      </div>
                      <div className={styles.Genres}>
                        <LiaFilmSolid />
                        <div className="leading-3">
                          {movieGenres &&
                            i.genre_ids.map((g) => <span key={g}>{movieGenres[g]}</span>)}
                        </div>
                      </div>
                    </Link>
                  )}
                  {i.media_type === 'tv' && (
                    <Link to={`/title/tvSeries/${i.id}`} onClick={handleSearchOnClick}>
                      <div className="flex justify-center mt-5">
                        <img src={tmdbApiConfig.w500Image(i.poster_path)} />
                      </div>
                      <h2 className="font-semibold text-base text-slate-200 mt-3 text-center px-2 h-20">
                        {i.name}
                      </h2>
                      <div className={styles.Rating}>
                        <AiFillStar />
                        <div className="font-semibold text-base mx-2 text-slate-200">
                          {i.vote_average}
                        </div>
                        <div className="relative">
                          <div className={styles.TitleType}>TV Series</div>
                        </div>
                      </div>
                      <div className={styles.Genres}>
                        <LiaFilmSolid />
                        <div className="leading-3">
                          {movieGenres &&
                            i.genre_ids.map((g) => <span key={g}>{movieGenres[g]}</span>)}
                        </div>
                      </div>
                    </Link>
                  )}
                  {i.media_type === 'person' && (
                    <div className={styles.Person} onClick={handleSearchOnClick}>
                      <div className="flex justify-center">
                        <img src={tmdbApiConfig.w500Image(i.profile_path)} />
                      </div>
                      <h2 className="font-semibold text-base text-slate-200 mt-3 text-center px-2 h-20">
                        {i.name}
                      </h2>
                      <div className={styles.Rating}>
                        <AiFillStar />
                        <div className="font-semibold text-base mx-2 text-slate-200">
                          {i.popularity}
                        </div>
                        <div className="relative">
                          <div className={styles.TitleType}>{i.media_type}</div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-left text-slate-200 leading-4 pl-2">Known for:</div>
                        <div className="leading-3 ml-2">
                          {i.known_for.map((g) => (
                            <span
                              className="inline-block text-slate-400 font-normal text-xs mr-1"
                              key={g.id}
                            >
                              • {g.media_type === 'movie' ? g.title : g.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            {chosenType === 'Movies' &&
              movieSearchData?.results.map((i) => (
                <Link to={`/title/movie/${i.id}`} onClick={handleSearchOnClick}>
                  <div className="flex justify-center mt-5">
                    <img src={tmdbApiConfig.w500Image(i.poster_path)} />
                  </div>
                  <h2 className="font-semibold text-base text-slate-200 mt-3 text-center px-2 h-20">
                    {i.title}
                  </h2>
                  <div className={styles.Rating}>
                    <AiFillStar />
                    <div className="font-semibold text-base mx-2 text-slate-200">
                      {i.vote_average}
                    </div>
                    <div className="relative">
                      <div className={styles.TitleType}>Movie</div>
                    </div>
                  </div>
                  <div className={styles.Genres}>
                    <LiaFilmSolid />
                    <div className="leading-3">
                      {movieGenres && i.genre_ids.map((g) => <span key={g}>{movieGenres[g]}</span>)}
                    </div>
                  </div>
                </Link>
              ))}
            {chosenType === 'TV Series' &&
              tvSearchData?.results.map((i) => (
                <Link to={`/title/tvSeries/${i.id}`} onClick={handleSearchOnClick}>
                  <div className="flex justify-center mt-5">
                    <img src={tmdbApiConfig.w500Image(i.poster_path)} />
                  </div>
                  <h2 className="font-semibold text-base text-slate-200 mt-3 text-center px-2 h-20">
                    {i.name}
                  </h2>
                  <div className={styles.Rating}>
                    <AiFillStar />
                    <div className="font-semibold text-base mx-2 text-slate-200">
                      {i.vote_average}
                    </div>
                    <div className="relative">
                      <div className={styles.TitleType}>TV Series</div>
                    </div>
                  </div>
                  <div className={styles.Genres}>
                    <LiaFilmSolid />
                    <div className="leading-3">
                      {movieGenres && i.genre_ids.map((g) => <span key={g}>{movieGenres[g]}</span>)}
                    </div>
                  </div>
                </Link>
              ))}
            {chosenType === 'Person' && //TODO - Person page
              personSearchData?.results.map((i) => (
                <div className={styles.Person} onClick={handleSearchOnClick}>
                  <div className="flex justify-center">
                    <img src={tmdbApiConfig.w500Image(i.profile_path)} />
                  </div>
                  <h2 className="font-semibold text-base text-slate-200 mt-3 text-center px-2 h-5">
                    {i.name}
                  </h2>
                  <div className={styles.Rating}>
                    <AiFillStar />
                    <div className="font-semibold text-base mx-2 text-slate-200">
                      {i.popularity}
                    </div>
                    <div className="relative">
                      <div className={styles.TitleType}>{i.known_for_department}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="text-left text-slate-200 leading-4 pl-2">Known for:</div>
                    <div className="leading-3 ml-2">
                      {i.known_for.map((g) => (
                        <span
                          className="inline-block text-slate-400 font-normal text-xs mr-1"
                          key={g.id}
                        >
                          • {g.media_type === 'movie' ? g.title : g.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default SearchInput
