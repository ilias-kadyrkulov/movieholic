import { useGetTopBoxOfficeQuery } from "../../../api/titles.api"
import MediumSlider from "../../../components/MediumSlider/MediumSlider"

const TopBoxOffice = () => {
    const {results} = useGetTopBoxOfficeQuery({
        list: 'top_boxoffice_200',
        info: 'base_info'
    }, {
        selectFromResult: ({ data }) => ({
            results: data?.results
        })
    })
    

    return (
        <div className="font-bold text-3xl text-white mb-8">
            <div className="mb-5">Top 200 all-time box office movies</div>
            <MediumSlider topBoxOffice={results} />
        </div>
    )
}

export default TopBoxOffice
