import { cn } from 'shared/lib/classNames/classNames'
import { type FC, useState, memo } from 'react'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LanguageSwitcher } from 'widgets/LanguageSwitcher'
import { Button, ThemeButton } from 'shared/ui/Button'
import { SizeButton } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { SidebarItemList } from 'widgets/Sidebar/model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface Props {
    className?: string
}

export const Sidebar: FC<Props> = memo(({ className }) => {
    const { t } = useTranslation()

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
            <Button
                theme={ThemeButton.BACKGROUND_INVERTED}
                data-testid="sidebar-toggle"
                onClick={onToggle}
                size={SizeButton.L}
                className={classes.collapsedBtn}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={classes.items}>
                {SidebarItemList.map((item) => (
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        key={item.path}
                    />
                ))}
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher short={collapsed} />
            </div>
        </div>
    )
})
