import { cn } from 'shared/lib/classNames';
import { FC, memo } from 'react';
import classes from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string
}

const ArticleDetailsPage: FC<Props> = ({className}) => {
    const {t} = useTranslation('acticle')
    
    return (
        <div
            className={cn(classes.ArticleDetailsPage, {}, [className])}
        >
            ARTICLES DETAILS
        </div>
    )
}

export default memo(ArticleDetailsPage)