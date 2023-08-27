import { Mods, cn } from 'shared/lib/classNames'
import { ChangeEvent, FC, memo, useMemo } from 'react'
import classes from './Select.module.scss'

export interface SelectOption<T extends string> {
    value: T
    content: string
}

interface Props<T extends string> {
    className?: string
    label?: string
    options: SelectOption<T>[]
    value?: T
    onChange?: (value: T) => void
    readOnly?: boolean
}

export const Select = <T extends string>({
    className,
    label,
    options,
    onChange,
    value,
    readOnly,
}: Props<T>) => {
    const optionList = useMemo(
        () =>
            options.map(({ content, value }) => (
                <option
                    value={value}
                    className={classes.option}
                    key={value}
                >
                    {content}
                </option>
            )),
        [options]
    )

    const onChangeHandler = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        onChange?.(e.target.value as T)
    }

    const mods: Mods = {}

    return (
        <div
            className={cn(classes.Wrapper, mods, [
                className,
            ])}
        >
            {label && (
                <span className={classes.label}>
                    {label + '>'}
                </span>
            )}
            <select
                className={classes.select}
                value={value}
                disabled={readOnly}
                onChange={onChangeHandler}
            >
                {optionList}
            </select>
        </div>
    )
}
