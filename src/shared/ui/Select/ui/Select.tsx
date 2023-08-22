import { Mods, cn } from 'shared/lib/classNames'
import { ChangeEvent, FC, memo, useMemo } from 'react'
import classes from './Select.module.scss'

export interface SelectOption {
    value: string
    content: string
}

interface Props {
    className?: string
    label?: string
    options: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    readOnly?: boolean
}

export const Select: FC<Props> = memo(
    ({ className, label, options, onChange, value, readOnly }) => {
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
            onChange?.(e.target.value)
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
)
