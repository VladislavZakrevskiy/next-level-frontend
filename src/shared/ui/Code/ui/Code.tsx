import { cn } from '@/shared/lib/classNames'
import { FC, ReactNode, memo, useCallback } from 'react'
import classes from './Code.module.scss'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'

interface Props {
    className?: string
    text: string
}

export const Code: FC<Props> = memo(({
    className,
    text,
}) => {

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={cn(classes.Code, {}, [className])}>
            <Button
                onClick={onCopy}
                className={classes.copyBtn}
                theme={ThemeButton.CLEAR}
            >
                <CopyIcon className={classes.copyIcon}/>
            </Button>
            <code>{text}</code>
        </pre>
    )
}
)