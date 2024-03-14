import {
    useState,
    useEffect,
    FC,
    useRef,
    Children,
    isValidElement,
    cloneElement
} from 'react'
import { tmdbApiConfig } from '@/api/tmdbV3/tmdb.api'
import { useLazyLoadImage } from '@/hooks/useLazyLoadImage'

export const LazySlide: FC<{
    poster_path: string
    threshold: number
    margins?: string
    children: React.ReactNode
}> = ({ poster_path, threshold, margins = '', children }) => {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef(null)
    const src = useLazyLoadImage(
        isVisible ? tmdbApiConfig.originalImage(poster_path) : null
    )

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                console.log(entries, ' entries')

                const [entry] = entries
                setIsVisible(entry.isIntersecting)
            },
            { threshold: threshold, rootMargin: margins }
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [])

    return (
        <>
            {Children.map(children, child => {
                // Проверяем, является ли child допустимым элементом React,
                // так как нам нужно клонировать только элементы React
                if (isValidElement(child)) {
                    const propsForChild = {
                        imageSrc: src,
                        ref: (node: any) => {
                            // Передаем DOM элемент в ref.current
                            elementRef.current = node
                        }
                    }

                    return cloneElement(child, propsForChild)
                }
                return child
            })}
        </>
    )
}
