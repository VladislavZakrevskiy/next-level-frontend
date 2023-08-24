import { cn } from 'shared/lib/classNames'
import { FC, memo } from 'react'
import classes from './ArticleTextBlockComponent.module.scss'
import { ArticleTextBlock } from '../../model/types/article'
import { Text } from 'shared/ui/Text'

interface Props {
    className?: string
    block: ArticleTextBlock
}

export const ArticleTextBlockComponent: FC<Props> = memo(
    ({ className, block }) => {
        return (
            <div className={cn('', {}, [className])}>
                {block.title && (
                    <Text
                        title={block.title}
                        className={classes.title}
                    />
                )}
                {block.paragraphs.map((paragraph) => (
                    <Text
                        key={paragraph}
                        text={paragraph}
                        // className={classes.paragraph}
                    />
                ))}
            </div>
        )
    }
)
