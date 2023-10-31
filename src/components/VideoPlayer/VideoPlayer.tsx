import { useAppSelector } from '../../hooks/hooks'
import { useActions } from '../../hooks/useActions'
import VerticalEpisodeSlider from '../EpisodeSlider/VerticalMode/VerticalEpisodeSlider'
import styles from './VideoPlayer.module.scss'

const VideoPlayer = () => {
    const { playerDisabled } = useActions()

    const { file_code } = useAppSelector((state) => state.player)

    return (
        <div>
            <div className="flex pt-32 h-full">
                <div className="w-1/4 text-slate-200 px-5">Servers</div>
                <div className={styles.VideoPlayer}>
                    <iframe
                        src={`https://filemoon.sx/e/${file_code}}`}
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
                    playerDisabled()
                }}
            >
                Close Player
            </button>
        </div>
    )
}

export default VideoPlayer
