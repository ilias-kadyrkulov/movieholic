import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/hooks'
import { useActions } from '../../../hooks/useActions'
import VerticalEpisodeSlider from '../../EpisodeSlider/VerticalMode/VerticalEpisodeSlider'
import styles from './TVSeriesPlayer.module.scss'
import { useState, useEffect, useRef } from 'react'
import { useGetFileListQuery } from '../../../api/filemoon/file.api'
import ServerButton from '../../../common/Buttons/ServerButton/ServerButton'
import { useGetShowInfoByIdQuery } from '../../../api/show/titles.api'

const TVSeriesPlayer = () => {
    const { ep, id, titleText } = useParams<{
        ep?: string
        id?: string
        titleText?: string
    }>()
    const navigate = useNavigate()
    const { fileBeenChosen, fileListReceived, showBeenClicked } = useActions()

    const [server, setServer] = useState<'Filemoon' | 'Vidplay'>('Vidplay')

    const { title } = useAppSelector((state) => state.show)
    const { fileChosen } = useAppSelector((state) => state.player)
    const fileList = useAppSelector((state) => state.player.fileList)
    const { titleType, episodes } = useAppSelector((state) => state.show)
    console.log(fileList)
    console.log(titleType)
    
    console.log(id)

    const { show } = useGetShowInfoByIdQuery(id, {
        //TODO - save onto server
        selectFromResult: ({ data }) => ({
            show: data?.results
        })
    })
    if (show) {
        showBeenClicked({
            title: show.originalTitleText.text,
            titleType: show.titleType.text,
            episodes: show.episodes.episodes.total
        })
    }

    const { fileListData } = useGetFileListQuery(title, {
        //TODO - save onto server
        selectFromResult: ({ data }) => ({
            fileListData: data?.result.files
        })
    })
    if (fileListData && fileListData.length > 0) {
        const sortedFileListData = fileListData.slice().sort((a, b) =>
            a.title.localeCompare(b.title, undefined, {
                sensitivity: 'base'
            })
        )

        if (!fileList?.length) {
            fileListReceived(sortedFileListData)
        }
    }

    const iFrameRef = useRef<HTMLIFrameElement>(null)

    const episodeRegex = ep?.match(/\d+/)

    useEffect(() => {
        console.log('url changed to: ', ep)
        if (server === 'Filemoon') {
            if (episodeRegex && fileList) {
                const index = +episodeRegex[0] - 1
                const fileToDispatch = fileList[index]

                fileToDispatch && fileBeenChosen(fileToDispatch)

                if (fileListData && index > fileListData.length - 1) {
                    navigate(`/title/${id}/tvSeries/${titleText}/ep-1`)
                }
            }
        }
        if (episodeRegex && server === 'Vidplay' && episodes) {
            const episode = +episodeRegex[0]
            if (episode >= episodes) {
                navigate(`/title/${id}/tvSeries/${titleText}/ep-1`)
            } else if (episode === 0) {
                navigate(`/title/${id}/tvSeries/${titleText}/ep-1`)
            }
        }
    }, [fileList, episodeRegex])

    useEffect(() => {
        if (episodeRegex && server === 'Vidplay') {
            const episode = +episodeRegex[0]

            if (!!iFrameRef.current) {
                iFrameRef.current.src = `https://vidsrc.to/embed/tv/${id}/1/${episode}`
            }
        }
    }, [episodeRegex])

    const handleEpisodeClick = (index: number) => {
        if (iFrameRef.current) {
            iFrameRef.current.src = `https://vidsrc.to/embed/tv/${id}/1/${
                index + 1
            }`

            navigate(`/title/${id}/tvSeries/${titleText}/ep-${index + 1}`)
        }
    }

    return (
        <>
            <div>
                <div className="flex pt-32 h-full">
                    <div className="flex w-1/4 text-slate-200 px-5">
                        <div className="w-2/4">
                            You're watching Episode{' '}
                            <span className="text-green-700">
                                {episodeRegex}
                            </span>
                            .
                            <br />
                            If current server doesn't work, please try other
                            servers beside.
                        </div>
                        <div className="w-2/4 ml-2">
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
                    <div className={styles.VideoPlayer}>
                        {server === 'Filemoon' && fileChosen.file_code && (
                            <iframe
                                src={`https://filemoon.sx/e/${fileChosen.file_code}}`}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        )}
                        {server === 'Vidplay' && (
                            <iframe
                                src={`https://vidsrc.to/embed/tv/${id}`}
                                className="w-full h-full"
                                allowFullScreen
                                ref={iFrameRef}
                            />
                        )}
                    </div>
                    {server === 'Filemoon' &&  (
                        <div className="w-1/4">
                            <VerticalEpisodeSlider />
                        </div>
                    )}
                    {server === 'Vidplay' && (
                        <div className="w-1/4">
                            {Array.from(
                                { length: episodes - 1 },
                                (_, index) => (
                                    <div
                                        key={index}
                                        className={styles.Episode}
                                        onClick={() =>
                                            handleEpisodeClick(index)
                                        }
                                    >
                                        Episode {index + 1}
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TVSeriesPlayer
