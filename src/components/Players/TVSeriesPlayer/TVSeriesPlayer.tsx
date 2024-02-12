import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '@/hooks/hooks'
import VerticalEpisodeSlider from '@/components/EpisodeSlider/VerticalMode/VerticalEpisodeSlider'
import styles from './TVSeriesPlayer.module.scss'
import { useState, useEffect, useRef } from 'react'
// import { useGetFileListQuery } from '@/api/filemoon/file.api'
import ServerButton from '@/common/Buttons/ServerButton/ServerButton'
import { useLazyGetTVSeasonsDetailsQuery } from '@/api/tmdbV3/tvSeasons.api'
import { useGetTVSeriesDetailsByMovieIdQuery } from '@/api/tmdbV3/tvSeries.api'

const TVSeriesPlayer = () => {
  //FIXME - Fix filemoon server

  const { ep, id, titleText, seasonNumber } = useParams<{
    ep: string
    id: string
    titleText: string
    seasonNumber: string
  }>()
  const navigate = useNavigate()

  const [getTVSeasonsDetails, { data: tvSeasonDetails }] = useLazyGetTVSeasonsDetailsQuery()
  const { data: tvSeriesDetails } = useGetTVSeriesDetailsByMovieIdQuery({
    tvSeriesId: Number(id),
  })

  const [server, setServer] = useState<'Filemoon' | 'Vidplay'>('Vidplay')
  const [season, setSeason] = useState(Number(seasonNumber))
  const [isSeasonDropdownClicked, setIsSeasonDropdownClicked] = useState(false)

  const { fileChosen } = useAppSelector((state) => state.player)
  const fileList = useAppSelector((state) => state.player.fileList)

  useEffect(() => {
    seasonNumber &&
      getTVSeasonsDetails({ tvSeriesId: Number(id), season_number: Number(seasonNumber) })
  }, [seasonNumber])

  // const { fileListData } = useGetFileListQuery(title, {
  //     //TODO - save onto the server
  //     selectFromResult: ({ data }) => ({
  //         fileListData: data?.result.files
  //     })
  // })

  // if (fileListData && fileListData.length > 0) {
  //     const sortedFileListData = fileListData.slice().sort((a, b) =>
  //         a.title.localeCompare(b.title, undefined, {
  //             sensitivity: 'base'
  //         })
  //     )

  //     if (!fileList?.length) {
  //         fileListReceived(sortedFileListData)
  //     }
  // }

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const episodeRegex = ep?.match(/\d+/)
  const seasonNumberRegex = seasonNumber?.match(/\d+/)

  const episode = episodeRegex && +episodeRegex[0]
  const seasonNum = seasonNumberRegex && +seasonNumberRegex[0]

  const maxSeasonNumber = tvSeriesDetails?.seasons.reduce((max, s) => {
    //NOTE - max seasonNumber
    return Math.max(max, s.season_number)
  }, 0)

  const seasonCount = tvSeriesDetails?.seasons.filter((s) => s.season_number > 0)

  //   useEffect(() => {
  // if (server === 'Filemoon') {
  //         if (episodeRegex && fileList) {
  //             const index = +episodeRegex[0] - 1
  //             const fileToDispatch = fileList[index]

  //             fileToDispatch && fileBeenChosen(fileToDispatch)

  //             if (fileListData) {
  //                 if (index > fileListData.length - 1) {
  //                     //FIXME - bug in Firefox browser
  //                     navigate(
  //                         `/title/tvSeries/${id}/${titleText}/ep-1`
  //                     )
  //                 }
  //             }
  //         }
  //     }
  //   }, [fileList])

  useEffect(() => {
    if (
      //NOTE - Episode control
      episode &&
      server === 'Vidplay' &&
      tvSeasonDetails
    ) {
      if (episode > tvSeasonDetails.episodes.length) {
        navigate(`/title/tvSeries/${id}/${titleText}/season/1/ep-1`)
      }
    }
  }, [episode, tvSeasonDetails])

  useEffect(() => {
    if (episode === 0) {
      navigate(`/title/tvSeries/${id}/${titleText}/season/1/ep-1`)
    }
  }, [episode])

  useEffect(() => {
    if (seasonNum === 0) {
      navigate(`/title/tvSeries/${id}/${titleText}/season/1/ep-1`)
    }
  }, [seasonNum])

  useEffect(() => {
    //NOTE - Season control
    if (seasonNum && server === 'Vidplay' && tvSeriesDetails) {
      if (maxSeasonNumber && seasonNum > maxSeasonNumber) {
        setSeason(1)
        navigate(`/title/tvSeries/${id}/${titleText}/season/1/ep-1`)
      }
    }
  }, [seasonNum, tvSeriesDetails])

  useEffect(() => {
    //NOTE - Episode selection through url
    if (episode && server === 'Vidplay') {
      if (!!iframeRef.current) {
        iframeRef.current.src = `https://vidsrc.to/embed/tv/${id}/${seasonNumber}/${episode}`
      }
    }
  }, [episode])

  const handleEpisodeClick = (index: number) => {
    //NOTE - Episode selection
    if (iframeRef.current) {
      iframeRef.current.src = `https://vidsrc.to/embed/tv/${id}/${seasonNumber}/${index + 1}`

      navigate(`/title/tvSeries/${id}/${titleText}/season/${seasonNumber}/ep-${index + 1}`, {
        replace: true,
      })
    }
  }

  const handleSeasonDropdownOnClick = () => {
    setIsSeasonDropdownClicked(!isSeasonDropdownClicked)
  }

  const handleSeasonOnClick = (seasonNumber: number) => () => {
    navigate(`/title/tvSeries/${id}/${titleText}/season/${seasonNumber}/1`, {
      replace: true,
    })
    setSeason(seasonNumber)
    handleSeasonDropdownOnClick()
  }

  return (
    <div>
      <div className="text-center text-slate-200 font-semibold text-xl w-full pt-20 mb-5">
        {tvSeriesDetails?.name} | Season {tvSeasonDetails?.season_number}
      </div>
      <div className={styles.TVSeriesDeskLapPlayer}>
        <div className={styles.Left}>
          <div className={styles.Description}>
            You're watching Episode <span className="text-green-700">{episodeRegex}</span>.
            <br />
            If current server doesn't work, please try other servers beside.
          </div>
          <div className={styles.Servers}>
            <ServerButton
              text="Vidplay"
              onServerClick={() => setServer('Vidplay')}
              serverChosen={server}
            />
            <ServerButton
              text="Filemoon"
              onServerClick={() => setServer('Filemoon')}
              serverChosen={server}
            />
          </div>
        </div>
        <div className={styles.Wrapper}>
          {server === 'Filemoon' && fileChosen.file_code && fileList && (
            <iframe
              src={`https://filemoon.sx/e/${fileChosen.file_code}}`}
              className="w-full h-full"
              allowFullScreen
            />
          )}
          {server === 'Vidplay' && (
            <iframe
              src={`https://vidsrc.to/embed/tv/${id}/${seasonNumber}/${episode}`}
              className={styles.iframe}
              allowFullScreen
              ref={iframeRef}
            />
          )}
        </div>
        {server === 'Filemoon' && (
          <div className="w-1/4">
            <VerticalEpisodeSlider />
          </div>
        )}
        {server === 'Vidplay' && (
          <div className="relative w-1/4 flex flex-col mr-5">
            <p
              className="text-sm w-3/4 mb-3 text-slate-100 text-center border-slate-400 border-2 rounded-lg py-1 px-2"
              onClick={handleSeasonDropdownOnClick}
            >
              Season {season}
            </p>
            {isSeasonDropdownClicked && (
              <div className={styles.SeasonsDropdown}>
                {seasonCount?.map((s) => (
                  <div
                    className="text-xs text-slate-300 border-2 rounded-md py-1 px-2 cursor-pointer"
                    onClick={handleSeasonOnClick(s.season_number)}
                  >
                    Season {s.season_number}
                  </div>
                ))}
              </div>
            )}
            {tvSeasonDetails &&
              Array.from({ length: tvSeasonDetails.episodes.length }, (_, index) => (
                <div
                  key={index}
                  className={styles.Episode}
                  onClick={() => handleEpisodeClick(index)}
                >
                  Episode {index + 1}
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={styles.TVSeriesMobilePlayer}>
        <div className={styles.Wrapper}>
          {server === 'Filemoon' && fileChosen.file_code && fileList && (
            <iframe
              src={`https://filemoon.sx/e/${fileChosen.file_code}}`}
              className="w-full h-full"
              allowFullScreen
            />
          )}
          {server === 'Vidplay' && (
            <iframe
              src={`https://vidsrc.to/embed/tv/${id}/${seasonNumber}/${episode}`}
              className={styles.iframe}
              allowFullScreen
              ref={iframeRef}
            />
          )}
        </div>
        <div className={styles.LeftWrapper}>
          <div className={styles.Left}>
            <div className={styles.Description}>
              You're watching Episode <span className="text-green-700">{episodeRegex}</span>.
              <br />
              If current server doesn't work, please try other servers beside.
            </div>
            <div className={styles.Servers}>
              <ServerButton
                text="Vidplay"
                onServerClick={() => setServer('Vidplay')}
                serverChosen={server}
              />
              <ServerButton
                text="Filemoon"
                onServerClick={() => setServer('Filemoon')}
                serverChosen={server}
              />
            </div>
          </div>

          {server === 'Filemoon' && (
            <div className="w-1/4">
              <VerticalEpisodeSlider />
            </div>
          )}
          {server === 'Vidplay' && (
            <div className={styles.Seasons}>
              <p
                className="text-sm w-3/4 mb-3 text-slate-100 text-center border-slate-400 border-2 rounded-lg py-1 px-2"
                onClick={handleSeasonDropdownOnClick}
              >
                Season {season}
              </p>
              {isSeasonDropdownClicked && (
                <div className={styles.SeasonsDropdown}>
                  {seasonCount?.map((s) => (
                    <div
                      className="text-xs text-slate-300 border-2 text-center rounded-md py-1 px-2 cursor-pointer"
                      onClick={handleSeasonOnClick(s.season_number)}
                    >
                      Season {s.season_number}
                    </div>
                  ))}
                </div>
              )}

              <div className="relative w-3/4 flex flex-wrap items-center">
                {tvSeasonDetails &&
                  Array.from({ length: tvSeasonDetails.episodes.length }, (_, index) => (
                    <div
                      key={index}
                      className={styles.Episode}
                      onClick={() => {
                        handleEpisodeClick(index)
                      }}
                    >
                      {index + 1}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TVSeriesPlayer
