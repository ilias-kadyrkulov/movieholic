import { useGetTopRatedSeriesQuery } from '../../api/titles.api'
import { Carousel } from '../Slider/Slider'

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
            <Carousel topRatedSeries={results} />
        </div>
    )
}

export default Hero
