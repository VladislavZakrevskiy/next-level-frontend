import { cn } from 'shared/lib/classNames/classNames'
import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'

interface Props {
    className?: string
    short?: boolean
}

export const LanguageSwitcher: FC<Props> = ({
    className,
    short
}) => {
    const { t, i18n } = useTranslation()

    const toggle = async () => {
        i18n.changeLanguage(
            i18n.language === 'ru' ? 'en' : 'ru'
        )
    }

    return (
        <div className={cn('', {}, [className])}>
            <Button
                theme={ThemeButton.CLEAR}
                onClick={toggle}
            >
                {t(short ? 'Короткий язык' : 'Язык')}
            </Button>
        </div>
    )
}
