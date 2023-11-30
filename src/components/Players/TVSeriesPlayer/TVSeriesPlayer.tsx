import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/hooks'
import VerticalEpisodeSlider from '../../EpisodeSlider/VerticalMode/VerticalEpisodeSlider'
import styles from './TVSeriesPlayer.module.scss'
import { useState, useEffect, useRef } from 'react'
// import { useGetFileListQuery } from '../../../api/filemoon/file.api'
import ServerButton from '../../../common/Buttons/ServerButton/ServerButton'
import { useLazyGetTVSeasonsDetailsQuery } from '../../../api/tmdbV3/tvSeasons.api'
import { useGetTVSeriesDetailsByMovieIdQuery } from '../../../api/tmdbV3/tvSeries.api'
import { tmdbApiConfig } from '../../../api/tmdbV3/tmdb.api'

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

  const { fileChosen } = useAppSelector((state) => state.player)
  const fileList = useAppSelector((state) => state.player.fileList)
  console.log(fileList)

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
  const maxSeasonNumber = tvSeriesDetails?.seasons.reduce((max, s) => {
    //NOTE - max seasonNumber
    return Math.max(max, s.season_number)
  }, 0)

  useEffect(() => {
    console.log('url changed to: ', ep)
    // if (server === 'Filemoon') {
    //     if (episodeRegex && fileList) {
    //         const index = +episodeRegex[0] - 1
    //         const fileToDispatch = fileList[index]

    //         fileToDispatch && fileBeenChosen(fileToDispatch)

    //         if (fileListData) {
    //             if (index > fileListData.length - 1) {
    //                 //FIXME - bug in Firefox browser
    //                 navigate(
    //                     `/title/tvSeries/${id}/${titleText}/ep-1`
    //                 )
    //             }
    //         }
    //     }
    // }
    if (
      //NOTE - Episode control
      episodeRegex &&
      seasonNumberRegex &&
      server === 'Vidplay' &&
      tvSeasonDetails
    ) {
      const episode = +episodeRegex[0]
      const seasonNumber = +seasonNumberRegex[0]

      if (episode > tvSeasonDetails.episodes.length) {
        navigate(`/title/tvSeries/${id}/${titleText}/season/1/ep-1`)
      } else if (episode === 0 || seasonNumber === 0) {
        navigate(`/title/tvSeries/${id}/${titleText}/season/1/ep-1`)
      }
    }
  }, [fileList, episodeRegex, seasonNumberRegex])

  useEffect(() => {
    //NOTE - Season control
    if (seasonNumberRegex && server === 'Vidplay' && tvSeriesDetails) {
      const seasonNumber = +seasonNumberRegex[0]

      if (maxSeasonNumber && seasonNumber > maxSeasonNumber) {
        navigate(`/title/tvSeries/${id}/${titleText}/season/1/ep-1`)
      }
    }
  }, [seasonNumberRegex])

  useEffect(() => {
    //NOTE - Episode selection through url
    if (episodeRegex && server === 'Vidplay') {
      const episode = +episodeRegex[0]

      if (!!iframeRef.current) {
        iframeRef.current.src = `https://vidsrc.to/embed/tv/${id}/${seasonNumber}/${episode}`
      }
    }
  }, [episodeRegex])

  const handleEpisodeClick = (index: number) => {
    //NOTE - Episode selection
    if (iframeRef.current) {
      iframeRef.current.src = `https://vidsrc.to/embed/tv/${id}/${seasonNumber}/${index + 1}`

      navigate(`/title/tvSeries/${id}/${titleText}/season/${seasonNumber}/ep-${index + 1}`, {
        replace: true,
      })
    }
  }

  useEffect(() => {
    const iframeDocument = iframeRef.current?.contentDocument

    if (iframeDocument && iframeDocument.querySelector) {
      const bodyElement = iframeDocument.querySelector('main')
      if (bodyElement) {
        bodyElement.style.backgroundImage = `url(${tmdbApiConfig.w500Image(
          tvSeasonDetails?.poster_path,
        )}`
        bodyElement.style.backgroundSize = 'cover'
        bodyElement.style.backgroundPosition = 'center'
      }
    }
  }, [iframeRef.current])

  return (
    <>
      <div className={styles.MobileTablet}>
        <div className="flex pt-32 h-full">
          <div className={styles.TVSeriesPlayer}>
            {server === 'Filemoon' && fileChosen.file_code && (
              <iframe
                src={`https://filemoon.sx/e/${fileChosen.file_code}}`}
                className="w-full h-full"
                allowFullScreen
              />
            )}
            {server === 'Vidplay' && (
              <iframe
                src={`https://vidsrc.to/embed/tv/${id}/${seasonNumber}/${ep}`}
                className="w-full h-full"
                allowFullScreen
                ref={iframeRef}
              />
            )}
          </div>
        </div>
        <div className="flex mt-5">
          {server === 'Filemoon' && (
            <div className="w-2/4 flex flex-wrap">
              <VerticalEpisodeSlider />
            </div>
          )}
          {server === 'Vidplay' && (
            <div className="w-2/4">
              {tvSeasonDetails &&
                Array.from({ length: tvSeasonDetails.episodes.length }, (_, index) => (
                  <div
                    key={index}
                    className={styles.Episode}
                    onClick={() => handleEpisodeClick(index)}
                  >
                    {index + 1}
                  </div>
                ))}
            </div>
          )}
          <div className={styles.Servers}>
            <div className="w-2/4">
              You're watching Episode{' '}
              <span className="text-green-700">
                {episodeRegex} of season <span className="text-green-700">{seasonNumber}</span>
              </span>
              <br />
              If current server doesn't work, please try other servers beside.
            </div>
            <div className="pt-2">
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
        </div>
      </div>
      <div className={styles.LaptopDesktop}>
        <div className="flex pt-32 h-full">
          <div className={styles.Servers}>
            <div className="w-2/4">
              You're watching Episode <span className="text-green-700">{episodeRegex}</span> of
              season <span className="text-green-700">{seasonNumber}</span>.
              <br />
              If current server doesn't work, please try other servers beside.
            </div>
            <div className="w-2/4 pt-2">
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
          <div className={styles.TVSeriesPlayer}>
            {server === 'Filemoon' && fileChosen.file_code && fileList && (
              <iframe
                src={`https://filemoon.sx/e/${fileChosen.file_code}}`}
                className="w-full h-full"
                allowFullScreen
              />
            )}
            {server === 'Vidplay' && (
              <iframe
                src={`https://vidsrc.to/embed/tv/${id}/${seasonNumber}/${ep}`}
                className="w-full h-full"
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
            <div className="w-1/4">
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
      </div>
    </>
  )
}

export default TVSeriesPlayer
