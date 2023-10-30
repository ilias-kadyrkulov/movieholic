import { useGetTopRatedSeriesQuery } from '../../api/show/titles.api'
import { BigSlider } from '../BigSlider/BigSlider'

const Hero = () => {
    const { results } = useGetTopRatedSeriesQuery(
        { list: 'top_rated_series_250', info: 'base_info', sort: 'year.decr' },
        {
            selectFromResult: ({ data }) => ({
                results: data?.results
            })
        }
    )
    return (
        <div className="hero relative">
            <BigSlider topRatedSeries={results} />
        </div>
    )
}

export default Hero
