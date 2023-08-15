import { cn } from 'shared/lib/classNames';
import { FC, useState } from 'react';
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LanguageSwitcher } from 'shared/ui/LanguageSwitcher';

interface Props {
    className?: string
}

export const Sidebar: FC<Props> = ({className}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div
            className={cn(classes.Sidebar, {[classes.collapsed]: collapsed}, [className])}
        >
            <button onClick={onToggle}>toggle</button>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher/>
            </div>
        </div>
    )
}