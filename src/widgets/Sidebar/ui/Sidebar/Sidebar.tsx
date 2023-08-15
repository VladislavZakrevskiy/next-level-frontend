import { cn } from 'shared/lib/classNames/classNames'
import { type FC, useState } from 'react'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LanguageSwitcher } from 'widgets/LanguageSwitcher'

interface Props {
    className?: string
}

export const Sidebar: FC<Props> = ({ className }) => {
    const [collapsed, setCollapsed] =
        useState<boolean>(false)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    return (
        <div
            data-testid="TEST"
            className={cn(
                classes.Sidebar,
                { [classes.collapsed]: collapsed },
                [className]
            )}
        >
            <button data-testid='sidebar-toggle' onClick={onToggle}>toggle</button>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
        </div>
    )
}
