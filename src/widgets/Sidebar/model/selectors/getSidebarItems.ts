import React from "react"
import MainIcon from '@/shared/assets/icons/main-20-20.svg'
import AboutIcon from '@/shared/assets/icons/about-20-20.svg'
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'
import { createSelector } from "@reduxjs/toolkit"
import { getUserAuthData } from "@/entities/User"
import { SidebarItemType } from "../types/sidebarItemType"
import { RoutePath } from "@/shared/consts/router"



export const getSidebarItems = createSelector(getUserAuthData, (authData) => {
    const items: SidebarItemType[] = [
        {
            path: RoutePath.main,
            text: "Главная",
            Icon: MainIcon,
        },
        {
            path: RoutePath.about,
            text: "О нас",
            Icon: AboutIcon,
        },
    ]

    if (authData) {
        items.push({
            path: RoutePath.profile + authData.id,
            text: "Профиль",
            Icon: ProfileIcon,
            authOnly: true
        },
        {
            path: RoutePath.acticles,
            text: "Статьи",
            Icon: ArticleIcon,
            authOnly: true
        })
    }

    return items
})