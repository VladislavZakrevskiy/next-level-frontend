import { cn } from 'shared/lib/classNames'
import {
    FC,
    MouseEvent,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import classes from './Modal.module.scss'
import { Portal } from 'shared/ui/Portal'
import { useTheme } from 'app/providers/ThemeProvider'

interface Props {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

export const Modal: FC<Props> = ({
    className,
    children,
    isOpen,
    onClose,
    lazy
}) => {
    const [isClosing, setIsClosing] = useState(false)
    const [isMounting, setIsMounting] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const { theme } = useTheme()

    useEffect(() => {
        if (isOpen) {
            setIsMounting(true)
        }
    }, [isOpen])

    const mods: Record<string, boolean> = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing,
    }

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, 300)
        }
    }, [onClose])

    const onKeyDown = useCallback(
        (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') {
                closeHandler()
            }
        },
        [closeHandler]
    )

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown, isOpen])

    const onContentClick = (e: MouseEvent) => {
        e.stopPropagation()
    }

    if (lazy && !isMounting) {
        return null
    }

    return (
        <Portal>
            <div
                className={cn(classes.Modal, mods, [
                    className,
                    theme,
                    'app_modal',
                ])}
            >
                <div
                    className={classes.overlay}
                    onClick={closeHandler}
                >
                    <div
                        className={classes.content}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
