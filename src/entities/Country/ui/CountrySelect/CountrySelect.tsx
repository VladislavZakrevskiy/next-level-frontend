import { cn } from 'shared/lib/classNames'
import { FC, memo, useCallback, useMemo } from 'react'
import classes from './CountrySelect.module.scss'
import { Country } from '../../model/types/country'
import { Select } from 'shared/ui/Select'
import { useTranslation } from 'react-i18next'
import { ListBox } from 'shared/ui/Popups'

interface Props {
    className?: string
    value?: Country
    onChange?: (value: Country) => void
    readOnly?: boolean
}

export const CountrySelect: FC<Props> = memo(
    ({ className, onChange, value, readOnly }) => {
        const { t } = useTranslation('profile')
        const options = useMemo(() => {
            return [
                {
                    value: Country.Armenia,
                    content: t(Country.Armenia),
                },
                {
                    value: Country.Belarus,
                    content: t(Country.Belarus),
                },
                {
                    value: Country.Kazakhstan,
                    content: t(Country.Kazakhstan),
                },
                {
                    value: Country.Russia,
                    content: t(Country.Russia),
                },
                {
                    value: Country.Ukraine,
                    content: t(Country.Ukraine),
                },
            ]
        }, [t])

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country)
            },
            [onChange]
        )

        return (
            <ListBox
                className={cn('', {}, [className])}
                label={t('Страна')}
                items={options}
                onChange={onChangeHandler}
                value={value}
                readOnly={readOnly}
                direction='top-right'
            />
        )
    }
)
