import { FiDownload } from 'react-icons/fi'
import styles from './DownloadButton.module.scss'

const DownloadButton = () => {
    return (
        <button className={styles.DownloadButton} disabled>
            <FiDownload />
            <span>Download</span>
        </button>
    )
}

export default DownloadButton
