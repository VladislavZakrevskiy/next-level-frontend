import { cn } from 'shared/lib/classNames'
import {
    FC,
    MutableRefObject,
    ReactNode,
    UIEvent,
    useRef,
} from 'react'
import classes from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { UIActions, getUIScrollByPath } from 'features/UI'
import { useLocation } from 'react-router-dom'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/UseInitialEffect'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { useThrottling } from 'shared/lib/hooks/useThrottling/useThrottling'

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
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useSelector(
        (state: StateSchema) =>
            getUIScrollByPath(state, pathname)
    )

    const triggerRef =
        useRef() as MutableRefObject<HTMLDivElement>
    const wrapperRef =
        useRef() as MutableRefObject<HTMLElement>

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    })

    const onScroll = useThrottling(
        (e: UIEvent<HTMLDivElement>) => {
            dispatch(
                UIActions.setScrollPosition({
                    position: e.currentTarget.scrollTop,
                    path: pathname,
                })
            )
        },
        400
    )
    return (
        <section
            ref={wrapperRef}
            className={cn(classes.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    )
}
