import { cn } from '@/shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './ArticleImageBlockComponent.module.scss'
import { ArticleImageBlock } from '../../model/types/article'
import { Text, TextAlign } from '@/shared/ui/Text'

interface Props {
    className?: string
    block: ArticleImageBlock
}

export const ArticleImageBlockComponent: FC<Props> = memo(
    ({ className, block }) => {
        return (
            <div className={cn('', {}, [className])}>
                <img
                    src={block.src}
                    className={classes.img}
                    alt={block.title}
                />
                {block.title && (
                    <Text
                        text={block.title}
                        align={TextAlign.CENTER}
                    />
                )}
            </div>
        )
    }
)
