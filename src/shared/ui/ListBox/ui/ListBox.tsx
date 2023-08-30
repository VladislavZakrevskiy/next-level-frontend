import { cn } from 'shared/lib/classNames'
import React, { FC, ReactNode } from 'react'
import classes from './ListBox.module.scss'
import { Listbox as HListBox } from '@headlessui/react'
import { Button } from 'shared/ui/Button'
import { HStack } from 'shared/ui/Stack'

type DropdownDirection = 'top' | 'bottom'

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface Props {
    className?: string
    items: ListBoxItem[]
    value?: string
    defaultValue?: string
    onChange?: <T extends string>(value: T) => void
    readOnly?: boolean
    direction?: DropdownDirection
    label?: string
}

export const ListBox: FC<Props> = ({
    className,
    items,
    value,
    defaultValue,
    onChange,
    readOnly,
    direction = 'bottom',
    label,
}) => {
    return (
        <HStack gap="4">
            {label && <span>{label + '>'}</span>}
            <HListBox
                disabled={readOnly}
                as={'div'}
                className={cn(classes.ListBox, {}, [
                    className,
                ])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button
                    className={classes.trigger}
                >
                    <Button disabled={readOnly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={cn(classes.options, {}, [
                        classes[direction],
                    ])}
                >
                    {items.map((item) => {
                        return (
                            <HListBox.Option
                                key={item.value}
                                disabled={item.disabled}
                                value={item.value}
                                as={React.Fragment}
                            >
                                {({ active }) => (
                                    <li
                                        className={cn('', {
                                            [classes.active]:
                                                active,
                                            [classes.disabled]:
                                                item.disabled,
                                        })}
                                    >
                                        {item.content}
                                    </li>
                                )}
                            </HListBox.Option>
                        )
                    })}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
}
