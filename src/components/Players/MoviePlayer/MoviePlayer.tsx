import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ServerButton from '../../../common/Buttons/ServerButton/ServerButton'
import styles from './MoviePlayer.module.scss'
import { useAppSelector } from '../../../hooks/hooks'

const MoviePlayer = () => {
    const { id, titleText } = useParams<{ id?: string; titleText?: string }>()
    console.log(titleText)

    const [server, setServer] = useState<'Filemoon' | 'Vidplay'>('Vidplay')

    const fileChosen = useAppSelector((state) => state.player.fileChosen)

    return (
        <>
            <div>
                <div className="flex pt-32 h-full">
                    <div className="flex w-1/4 text-slate-200 px-5">
                        <div className="w-2/4">
                            You're watching{'  '}
                            <span className="text-green-700">{titleText}.</span>
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
                    <div className={styles.MoviePlayer}>
                        {server === 'Filemoon' && fileChosen.file_code && (
                            <iframe
                                src={`https://filemoon.sx/e/${fileChosen.file_code}}`}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        )}
                        {server === 'Filemoon' && !fileChosen.file_code && (
                            <iframe
                                src={`https://filemoon.sx/e/${fileChosen.file_code}}`}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        )}
                        {server === 'Vidplay' && (
                            <iframe
                                src={`https://vidsrc.to/embed/movie/${id}`}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoviePlayer
