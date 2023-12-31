import { cn } from '@/shared/lib/classNames/classNames'
import { type FC, useState, memo, useMemo } from 'react'
import classes from './Sidebar.module.scss'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { SizeButton } from '@/shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '@/widgets/Sidebar/model/selectors/getSidebarItems'
import { VStack } from '@/shared/ui/Stack'
import { LanguageSwitcher } from '@/features/LanguageSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'

interface Props {
    className?: string
}

export const Sidebar: FC<Props> = memo(({ className }) => {
    const { t } = useTranslation()
    const SidebarItemList = useSelector(getSidebarItems)
    const [collapsed, setCollapsed] =
        useState<boolean>(false)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const itemList = useMemo(
        () =>
            SidebarItemList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed]
    )

    return (
        <aside
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
            <VStack
                role="navigation"
                gap="8"
                align="start"
                className={classes.items}
            >
                {itemList}
            </VStack>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher short={collapsed} />
            </div>
        </aside>
    )
})
