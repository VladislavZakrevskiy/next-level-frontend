import { cn } from '@/shared/lib/classNames'
import { FC, ReactNode, useCallback } from 'react'
import classes from './Tabs.module.scss'
import { Card, CardTheme } from '@/shared/ui/Card'

export interface TabItem {
    value: string
    content: ReactNode
}

interface Props {
    className?: string
    tabs: TabItem[]
    value: string
    onTabClick: (tab: TabItem) => void
}

export const Tabs: FC<Props> = ({
    className,
    onTabClick,
    tabs,
    value,
}) => {
    const clickHandler = useCallback(
        (tab: TabItem) => () => onTabClick(tab),
        [onTabClick]
    )

    return (
        <div className={cn(classes.Tabs, {}, [className])}>
            {tabs.map((tab) => {
                return (
                    <Card
                        theme={
                            tab.value === value
                                ? CardTheme.NORMAL
                                : CardTheme.OUTLINED
                        }
                        key={tab.value}
                        className={classes.tab}
                        onClick={clickHandler(tab)}
                    >
                        {tab.content}
                    </Card>
                )
            })}
        </div>
    )
}
