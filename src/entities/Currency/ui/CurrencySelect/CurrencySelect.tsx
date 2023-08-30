import { cn } from 'shared/lib/classNames'
import { FC, memo, useCallback, useMemo } from 'react'
import classes from './CurrencySelect.module.scss'
import { Currency } from '../../model/types/currency'
import { Select } from 'shared/ui/Select'
import { useTranslation } from 'react-i18next'
import { ListBox } from 'shared/ui/ListBox'

interface Props {
    className?: string
    value?: Currency
    onChange?: (value: Currency) => void
    readOnly?: boolean
}

export const CurrencySelect: FC<Props> = memo(
    ({ className, onChange, value, readOnly }) => {
        const { t } = useTranslation('profile')
        const options = useMemo(() => {
            return [
                {
                    value: Currency.RUB,
                    content: t(Currency.RUB),
                },
                {
                    value: Currency.EUR,
                    content: t(Currency.EUR),
                },
                {
                    value: Currency.USD,
                    content: t(Currency.USD),
                },
            ]
        }, [t])

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency)
            },
            [onChange]
        )

        return (
            <ListBox
                className={cn('', {}, [className])}
                label={t('Валюта')}
                items={options}
                onChange={onChangeHandler}
                value={value}
                readOnly={readOnly}
            />
        )
    }
)
