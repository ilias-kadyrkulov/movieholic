import CustomLink from '../../common/CustomLink/CustomLink'
import styles from './PagesList.module.scss'

const PagesList = () => {
    return (
        <div className={styles.PagesList}>
            <div>
                <CustomLink to="/">Home</CustomLink>
            </div>
            <div>
                <CustomLink to="/discover">Discover</CustomLink>
            </div>
            <div>
                <CustomLink to="/movie-release">Movie Release</CustomLink>
            </div>
            <div>
                <CustomLink to="/forum">Forum</CustomLink>
            </div>
            <div>
                <CustomLink to="/about">About</CustomLink>
            </div>
        </div>
    )
}

export default PagesList
