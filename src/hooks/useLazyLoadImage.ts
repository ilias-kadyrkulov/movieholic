import { useState, useEffect } from 'react'

export const useLazyLoadImage = (src: string | null) => {
    const [sourceLoaded, setSourceLoaded] = useState<string | null>(null)

    useEffect(() => {
        if (src) {
            const img = new Image()
            img.src = src
            img.onload = () => setSourceLoaded(src)
        }
    }, [src])

    return sourceLoaded
}
