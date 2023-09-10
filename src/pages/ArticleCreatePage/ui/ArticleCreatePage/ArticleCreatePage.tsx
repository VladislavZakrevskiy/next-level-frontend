import { cn } from '@/shared/lib/classNames';
import { FC } from 'react';

interface Props {
    className?: string
}

const ArticleCreatePage: FC<Props> = ({className}) => {
    return (
        <div
            className={cn('', {}, [className])}
        >
            
        </div>
    )
}

export default ArticleCreatePage