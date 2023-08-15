import { cn } from 'shared/lib/classNames'
import { FC } from 'react'
import classes from './LanguageSwitcher.module.scss'
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button';

interface Props {
	className?: string
}

export const LanguageSwitcher: FC<Props> = ({
	className,
}) => {
    const {t, i18n} = useTranslation()

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

	return (
		<div
			className={cn(classes.LanguageSwitcher, {}, [
				className,
			])}
		>
            <Button theme={ThemeButton.CLEAR} onClick={toggle}>{t('Язык')}</Button>
        </div>
	)
}
