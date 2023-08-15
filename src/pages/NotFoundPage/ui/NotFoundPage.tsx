import { cn } from 'shared/lib/classNames';
import { FC } from 'react';
import classes from './NotFoundPage.module.scss'
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string
}

export const NotFoundPage: FC<Props> = ({className}) => {
    const {t} = useTranslation()

    return (
        <div
            className={cn(classes.NotFoundPage, {}, [className])}
        >
            {t('Страница не найдена')}
        </div>
    )
}