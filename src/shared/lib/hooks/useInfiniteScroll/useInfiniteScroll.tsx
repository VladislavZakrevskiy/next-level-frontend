import { MutableRefObject, useEffect, useRef } from "react"

export interface UseInfiniteScrollProps {
    callback?: () => void
    triggerRef: MutableRefObject<HTMLElement>
    wrapperRef: MutableRefObject<HTMLElement>
}

export const useInfiniteScroll = (props: UseInfiniteScrollProps) => {
    const {callback, triggerRef, wrapperRef} = props
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current

    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: wrapperElement ,
            rootMargin: '0px',
            threshold: 1
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback?.()
            }
        }, options)

        observer.observe(triggerElement)

        return () => {
            if (observer && triggerElement) {
                observer.unobserve(triggerElement)
            }
        }
    }, [])
}