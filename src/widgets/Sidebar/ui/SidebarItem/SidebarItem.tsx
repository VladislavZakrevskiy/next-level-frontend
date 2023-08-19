import { FC, memo } from 'react'
import classes from './SidebarItem.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink'
import { SidebarItemType } from 'widgets/Sidebar/model/items'
import { useTranslation } from 'react-i18next'
import { cn } from 'shared/lib/classNames'

interface Props {
    item: SidebarItemType
    collapsed: boolean
}

export const SidebarItem: FC<Props> = memo(
    ({ item: { Icon, path, text }, collapsed }) => {
        const { t } = useTranslation()

        return (
            <AppLink
                to={path}
                theme={AppLinkTheme.SECONDARY}
                className={cn(classes.item, {
                    [classes.collapsed]: collapsed,
                })}
            >
                <Icon className={classes.icon} />
                <span className={classes.link}>
                    {t(text)}
                </span>
            </AppLink>
        )
    }
)
