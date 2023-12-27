import { RotatingLines } from 'react-loader-spinner'
import { BigSlider } from '../Sliders/BigSlider/BigSlider'
import { useGetNowPlayingMoviesQuery } from '../../api/tmdbV3/movieLists.api'

const Hero = () => {
  const { data: nowPlayingMoviesData, isFetching } = useGetNowPlayingMoviesQuery({})

  return (
    <>
      <div className="hero relative">
        {isFetching && (
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="100"
              visible={true}
            />
          </div>
        )}
        <BigSlider data={nowPlayingMoviesData?.results} />
      </div>
    </>
  )
}

export default Hero
