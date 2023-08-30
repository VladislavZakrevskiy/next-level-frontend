import { cn } from 'shared/lib/classNames'
import React, { FC, ReactNode } from 'react'
import classes from './Dropdown.module.scss'
import { Menu } from '@headlessui/react'
import { DropdownDirection } from 'shared/types/ui'
import { AppLink } from 'shared/ui/AppLink'

export interface DropdownItem {
    disabled?: boolean
    content: ReactNode
    onClick: () => void
    href?: string
}

interface Props {
    className?: string
    items: DropdownItem[]
    renderer: ReactNode
    direction?: DropdownDirection
}

export const Dropdown: FC<Props> = ({
    className,
    items,
    renderer,
    direction = 'bottom-left',
}) => {
    return (
        <Menu
            as="div"
            className={cn(classes.Dropdown, {}, [
                className,
            ])}
        >
            <Menu.Button className={classes.btn}>
                {renderer}
            </Menu.Button>
            <Menu.Items
                className={cn(classes.items, {}, [
                    classes[direction],
                ])}
            >
                {items.map((item) => (
                    <Menu.Item as={React.Fragment}>
                        {({ active }) => {
                            if (item.href) {
                                return (
                                    <AppLink
                                        className={cn(
                                            classes.item,
                                            {
                                                [classes.active]:
                                                    active,
                                            },
                                            []
                                        )}
                                        to={item.href}
                                    >
                                        {item.content}
                                    </AppLink>
                                )
                            }

                            return (
                                <button
                                    className={cn(
                                        classes.item,
                                        {
                                            [classes.active]:
                                                active,
                                        },
                                        []
                                    )}
                                >
                                    {item.content}
                                </button>
                            )
                        }}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    )
}
