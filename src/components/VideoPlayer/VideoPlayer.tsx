import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { useActions } from '../../hooks/useActions'
import VerticalEpisodeSlider from '../EpisodeSlider/VerticalMode/VerticalEpisodeSlider'
import styles from './VideoPlayer.module.scss'
import { useState, useEffect, useRef } from 'react'
import { useGetFileListQuery } from '../../api/filemoon/file.api'
import ServerButton from '../../common/Buttons/ServerButton/ServerButton'
import { useGetShowInfoByIdQuery } from '../../api/show/titles.api'

const VideoPlayer = () => {
    const { ep, id } = useParams<{ ep?: string; id?: string }>()
    const navigate = useNavigate()
    const { fileBeenChosen, fileListReceived, showBeenClicked } = useActions()

    const [server, setServer] = useState<'Filemoon' | 'Vidplay'>('Vidplay')

    const { title } = useAppSelector((state) => state.show)
    const { fileChosen } = useAppSelector((state) => state.player)
    const fileList = useAppSelector((state) => state.player.fileList)
    const { titleType, episodes } = useAppSelector((state) => state.show)
    console.log(fileList)
    console.log(titleType)
    console.log(episodes)
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

    const episodeRegex = ep?.match(/\d+/)

    useEffect(() => {
        console.log('url changed to: ', ep)
        if (episodeRegex && fileList) {
            const index = +episodeRegex[0] - 1
            const fileToDispatch = fileList[index]

            fileToDispatch && fileBeenChosen(fileToDispatch)

            if (fileListData && index > fileListData.length - 1) {
                navigate(`/title/${id}/ep-1`)
            }
        }
    }, [fileList, ep])

    useEffect(() => {
        if (episodeRegex) {
            const episode = +episodeRegex[0]

            if (iFrameRef.current) {
                iFrameRef.current.src = `https://vidsrc.to/embed/tv/${id}/1/${episode}`
            }
        }
    }, [ep, server, fileList])

    const iFrameRef = useRef<HTMLIFrameElement>(null)

    const handleEpisodeClick = (index: number) => {
        if (iFrameRef.current) {
            iFrameRef.current.src = `https://vidsrc.to/embed/tv/${id}/1/${
                index + 1
            }`

            navigate(`/title/${id}/ep-${index + 1}`)
        }
    }

    return (
        <>
            <div>
                <div className="flex pt-32 h-full">
                    <div className="flex w-1/4 text-slate-200 px-5">
                        <div className="w-2/4">
                            You're watching Episode <span className='text-green-700'>{episodeRegex}</span>.
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
                        {server === 'Vidplay' && titleType === 'Movie' && (
                            <iframe
                                src={`https://vidsrc.to/embed/movie/${id}`}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        )}
                        {server === 'Vidplay' && titleType === 'TV Series' && (
                            <iframe
                                src={`https://vidsrc.to/embed/tv/${id}`}
                                className="w-full h-full"
                                allowFullScreen
                                id="vidplayPlayer"
                                ref={iFrameRef}
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

export default VideoPlayer
