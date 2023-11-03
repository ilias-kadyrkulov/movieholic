import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { useActions } from '../../hooks/useActions'
import VerticalEpisodeSlider from '../EpisodeSlider/VerticalMode/VerticalEpisodeSlider'
import styles from './VideoPlayer.module.scss'
import { useEffect } from 'react'
import { useGetFileListQuery } from '../../api/filemoon/file.api'

const VideoPlayer = () => {
    const { ep } = useParams<{ ep?: string }>()
    const { fileBeenChosen, fileListEmptied, fileListReceived } = useActions()

    const { title } = useAppSelector((state) => state.show)
    const { fileChosen } = useAppSelector((state) => state.player)
    const fileList = useAppSelector((state) => state.player.fileList)

    const { fileListData } = useGetFileListQuery(title, {
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

    const episode = ep?.match(/\d+/)

    useEffect(() => {
        console.log('url changed to: ', ep)

        if (episode && fileList) {
            const index = +episode[0] - 1
            const fileToDispatch = fileList[index]

            fileToDispatch && fileBeenChosen(fileToDispatch)
        }
    }, [fileList])

    return (
        <>
            {fileChosen.file_code && (
                <div>
                    <div className="flex pt-32 h-full">
                        <div className="w-1/4 text-slate-200 px-5">Servers</div>
                        <div className={styles.VideoPlayer}>
                            <iframe
                                src={`https://filemoon.sx/e/${fileChosen.file_code}}`}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        </div>
                        <div className="w-1/4">
                            <VerticalEpisodeSlider />
                        </div>
                    </div>

                    <button
                        className="py-3 px-5 font-bold text-slate-200 text-xl"
                        onClick={() => {
                            fileListEmptied()
                        }}
                    >
                        Close Player
                    </button>
                </div>
            )}
        </>
    )
}

export default VideoPlayer
