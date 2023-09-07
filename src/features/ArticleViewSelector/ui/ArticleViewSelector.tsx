import { cn } from '@/shared/lib/classNames'
import { FC, memo, useCallback } from 'react'
import classes from './ArticleViewSelector.module.scss'
import { ArticleView } from '@/entities/Article'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg'

interface Props {
    className?: string
    view: ArticleView
    onViewClick: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        Icon: TiledIcon,
    },
    { view: ArticleView.BIG, Icon: ListIcon },
]

export const ArticleViewSelector: FC<Props> = memo(
    ({ className, onViewClick, view }) => {
        const onClick = useCallback(
            (newView: ArticleView) => () => {
                onViewClick(newView)
            },
            []
        )

        return (
            <div className={cn('', {}, [className])}>
                {viewTypes.map((viewType) => (
                    <Button
                        key={viewType.view}
                        onClick={onClick(viewType.view)}
                        theme={ThemeButton.CLEAR}
                    >
                        <Icon
                            className={cn('', {
                                [classes.notSelected]:
                                    view !== viewType.view,
                            })}
                            Svg={viewType.Icon}
                        />
                    </Button>
                ))}
            </div>
        )
    }
)
