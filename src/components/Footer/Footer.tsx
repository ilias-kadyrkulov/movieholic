import styles from './Footer.module.scss'
import tmdbLogo from '../../assets/tmdb-primary-short.svg'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div>
        <span className="mr-3 text-slate-200 font-semibold">Data source:</span>
        <span>
          <img className='inline' src={tmdbLogo} />
        </span>
      </div>
      <div>
        <div className='text-slate-200 font-semibold'>Ilias Kadyrkulov</div>
        <a href="https://github.com/ilias-kadyrkulov/movieholic" className='text-slate-200 font-medium'>Source: </a>
        <FaGithub />
      </div>
    </div>
  )
}

export default Footer
