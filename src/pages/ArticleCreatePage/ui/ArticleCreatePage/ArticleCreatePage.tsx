import { cn } from '@/shared/lib/classNames';
import { FC } from 'react';
import classes from './ArticleEditPage.module.scss'

interface Props {
    className?: string
}

const ArticleCreatePage: FC<Props> = ({className}) => {
    return (
        <div
            className={cn(classes.ArticleEditPage, {}, [className])}
        >
            
        </div>
    )
}

export default ArticleCreatePage