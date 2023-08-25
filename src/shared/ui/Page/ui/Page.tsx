import { cn } from 'shared/lib/classNames'
import {
    FC,
    MutableRefObject,
    ReactNode,
    useRef,
} from 'react'
import classes from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'

interface Props {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}

export const Page: FC<Props> = ({
    className,
    children,
    onScrollEnd,
}) => {
    const triggerRef =
        useRef() as MutableRefObject<HTMLDivElement>
    const wrapperRef =
        useRef() as MutableRefObject<HTMLElement>
    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    return (
        <section
            ref={wrapperRef}
            className={cn(classes.Page, {}, [className])}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    )
}
