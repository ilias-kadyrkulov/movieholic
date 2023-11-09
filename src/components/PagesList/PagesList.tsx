import CustomLink from '../../common/CustomLink/CustomLink'
import styles from './PagesList.module.scss'

const PagesList = () => {
    return (
        <div className={styles.PagesList}>
            <div>
                <CustomLink to="/movieholic/">Home</CustomLink>
            </div>
            <div>
                <CustomLink to="/movieholic/discover">Discover</CustomLink>
            </div>
            <div>
                <CustomLink to="/movieholic/movie-release">Movie Release</CustomLink>
            </div>
            <div>
                <CustomLink to="/movieholic/forum">Forum</CustomLink>
            </div>
            <div>
                <CustomLink to="/movieholic/about">About</CustomLink>
            </div>
        </div>
    )
}

export default PagesList
