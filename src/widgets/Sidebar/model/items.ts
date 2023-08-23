import React from "react"
import { RoutePath } from "shared/config/routeConfig/routeConfig"
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg'

export interface SidebarItemType {
    path: string
    text: string    
    Icon:  React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}

export const SidebarItemList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        text: "Главная",
        Icon: MainIcon,
    },
    {
        path: RoutePath.main,
        text: "О нас",
        Icon: AboutIcon,
    },
    {
        path: RoutePath.profile,
        text: "Профиль",
        Icon: ProfileIcon,
        authOnly: true
    },
    {
        path: RoutePath.acticles,
        text: "Статьи",
        Icon: ProfileIcon,
        authOnly: true
    }
]