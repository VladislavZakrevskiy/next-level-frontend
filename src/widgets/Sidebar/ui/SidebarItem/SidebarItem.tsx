import { FC, memo } from 'react'
import classes from './SidebarItem.module.scss'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/classNames'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebarItemType'

interface Props {
    item: SidebarItemType
    collapsed: boolean
}

export const SidebarItem: FC<Props> = memo(
    ({
        item: { Icon, path, text, authOnly },
        collapsed,
    }) => {
        const { t } = useTranslation()
        const isAuth = useSelector(getUserAuthData)

        if (authOnly && !isAuth) {
            return null
        }

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
