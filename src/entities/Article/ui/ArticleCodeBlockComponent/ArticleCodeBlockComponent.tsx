import { cn } from '@/shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './ArticleCodeBlockComponent.module.scss'
import { ArticleCodeBlock } from '../../model/types/article'
import { Code } from '@/shared/ui/Code'

interface Props {
    className?: string
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent: FC<Props> = memo(
    ({ className, block }) => {
        return (
            <div className={cn('', {}, [className])}>
                <Code text={block.code} />
            </div>
        )
    }
)
