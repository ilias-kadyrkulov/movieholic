import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './SmallSlider.module.scss'
import styled from 'styled-components'
import { SmallMediumEntryType } from '../../../api/show/titles.api'
import { AiFillStar } from 'react-icons/ai'
import { LiaFilmSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'

type PropsType = {
  popularOfTheWeek?: SmallMediumEntryType[]
}

const CustomStyles = styled.div``

const SmallSlider = (props: PropsType) => {
  return (
    <CustomStyles>
      <Swiper
        className={styles.SmallSlider}
        navigation
        breakpoints={{
          2000: {
            slidesPerView: 5,
          },
          1500: {
            slidesPerView: 4,
          },
          1150: {
            slidesPerView: 3,
          },
          475: {
            slidesPerView: 2,
          },
        }}
      >
        {props.popularOfTheWeek?.map((e, index) => (
          <SwiperSlide key={e.id}>
            <Link to={`title/movie/${e.id}`}>
              {e.primaryImage && e.primaryImage.url && (
                <div className={styles.MovieCard}>
                  <div className={styles.Number}>{index + 1}</div>
                  <img src={e.primaryImage.url} />
                  <div className={styles.MovieDetails}>
                    <h2 className="font-semibold text-base text-white mt-3">
                      {e.originalTitleText.text}
                    </h2>

                    <div className={styles.Rating}>
                      <AiFillStar />
                      <div className="font-semibold text-lg mx-2 text-white">
                        {e.ratingsSummary.aggregateRating}
                      </div>
                      <div className="relative">
                        <div className={styles.TitleType}>{e.titleType.text}</div>
                      </div>
                    </div>
                    <div className={styles.Genres}>
                      <div>
                        <LiaFilmSolid />
                      </div>
                      <div className="leading-3 w-3/4 text-center">
                        {e.genres.genres.map((g) => (
                          <span className="font-semibold text-slate-400 mr-1" key={g.id}>
                            {g.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomStyles>
  )
}

export default SmallSlider
