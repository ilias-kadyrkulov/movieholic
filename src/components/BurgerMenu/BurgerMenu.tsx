import CustomLink from '@/common/CustomLink/CustomLink'
import styles from './BurgerMenu.module.scss'

const BurgerMenu = () => {
    return (
        <div className={styles.BurgerMenu}>
            <CustomLink to="/mobile-menu">
                <span className={styles.first}></span>
                <span className={styles.second}></span>
                <span className={styles.third}></span>
            </CustomLink>
        </div>
    )
}

export default BurgerMenu
