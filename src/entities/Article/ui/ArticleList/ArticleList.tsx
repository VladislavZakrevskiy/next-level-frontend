import { cn } from '@/shared/lib/classNames'
import { FC, useCallback } from 'react'
import classes from './ArticleList.module.scss'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { ArticleView } from '@/entities/Article/model/consts/consts'
import { Article } from '@/entities/Article/model/types/article'
// import {
//     AutoSizer,
//     List,
//     ListRowProps,
//     WindowScroller,
// } from 'react-virtualized'
// import { PAGE_ID } from 'widgets/Page/ui/Page'

interface Props {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view: ArticleView
}

const getSkeleton = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, i) => (
            <ArticleListItemSkeleton
                view={view}
                key={i}
                className={classes.card}
            />
        ))
}

export const ArticleList: FC<Props> = ({
    className,
    view,
    articles,
    isLoading,
}) => {
    // const isBig = view === ArticleView.BIG

    // const itemsPerRow = isBig ? 1 : 3
    // const rowCount = Math.ceil(
    //     articles.length / itemsPerRow
    // )

    // const renderRow = ({ index }: ListRowProps) => {
    //     const items = []
    //     const fromIndex = index * itemsPerRow
    //     const toIndex = Math.min(
    //         fromIndex + itemsPerRow,
    //         articles.length
    //     )

    //     for (let i = fromIndex; i < toIndex; i++) {
    //         items.push(
    //             <ArticleListItem
    //                 article={articles[i]}
    //                 view={view}
    //                 className={classes.card}
    //                 target="_blank"
    //                 key={articles[i].id}
    //             />
    //         )
    //     }

    //     return <div className={classes.row}>{items}</div>
    // }

    const renderArticle = useCallback(
        (article: Article) => {
            return (
                <ArticleListItem
                    key={article.id}
                    className={classes.card}
                    article={article}
                    view={view}
                />
            )
        },
        [view]
    )

    return (
        <div data-testid='ArticleList'
            className={cn('', {}, [
                className,
                classes[view],
            ])}
        >
            {articles.length
                ? articles.map(renderArticle)
                : null}
            {isLoading ? getSkeleton(view) : null}
        </div>
        // <WindowScroller
        //     scrollElement={
        //         document.getElementById(PAGE_ID) as Element
        //     }
        // >
        //     {({
        //         height,
        //         width,
        //         registerChild,
        //         scrollTop,
        //         isScrolling,
        //         onChildScroll,
        //     }) => (
        //         <div
        //             ref={registerChild}
        //             className={cn('', {}, [
        //                 className,
        //                 classes[view],
        //             ])}
        //         >
        //             <List
        //                 rowHeight={isBig ? 700 : 330}
        //                 autoHeight
        //                 rowCount={rowCount}
        //                 rowRenderer={renderRow}
        //                 height={height ?? 700}
        //                 width={width ? width - 80 : 700}
        //                 onScroll={onChildScroll}
        //                 isScrolling={isScrolling}
        //                 scrollTop={scrollTop}
        //             />
        //             {isLoading ? getSkeleton(view) : null}
        //         </div>
        //     )}
        // </WindowScroller>
    )
}
