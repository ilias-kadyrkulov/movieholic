import ReactPlayer from 'react-player'

const TrailerPlayer = () => {
    return (
        <div className="flex justify-center pt-24">
            <ReactPlayer
                // url={}
                controls={true}
                width="800px"
                height="450px"
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 }
                    }
                }}
            />
        </div>
    )
}

export default TrailerPlayer
