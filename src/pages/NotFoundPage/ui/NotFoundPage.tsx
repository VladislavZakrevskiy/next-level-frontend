import { cn } from '@/shared/lib/classNames';
import { FC } from 'react';
import classes from './NotFoundPage.module.scss'
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

interface Props {
    className?: string
}

export const NotFoundPage: FC<Props> = ({className}) => {
    const {t} = useTranslation()

    return (
        <Page
        data-testid='notFound'
            className={cn(classes.NotFoundPage, {}, [className])}
        >
            {t('Страница не найдена')}
        </Page>
    )
}