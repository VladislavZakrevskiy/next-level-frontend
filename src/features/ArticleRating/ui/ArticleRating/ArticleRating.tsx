import { cn } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { RatingCard } from "@/entities/RatingCard";
import {
	useGetArticleRatingQuery,
	useRateArticleMutation,
} from "../../api/articleRatingApi";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui/Skeleton";

export interface ArticleRatingProps {
	className?: string;
	articleId: string;
}

const ArticleRating = memo(
	(props: ArticleRatingProps) => {
		const { className, articleId } = props;
		const { t } = useTranslation();
		const authData = useSelector(getUserAuthData);
		const { isLoading, data } =
			useGetArticleRatingQuery({
				articleId,
				userId: authData?.id ?? "",
			});
		const [rateArticle, {}] =
			useRateArticleMutation();

		const rateArticleHandle = useCallback(
			(starsCount: number, feedback?: string) => {
				try {
					rateArticle({
						articleId,
						userId: authData?.id ?? "",
						rate: starsCount,
						feedback,
					});
				} catch (error) {
					console.log(error);
				}
			},
			[authData?.id, articleId, rateArticle]
		);

		const onCancel = useCallback(
			(starsCount: number) => {
				rateArticleHandle(starsCount);
			},
			[rateArticleHandle]
		);

		const onAccept = useCallback(
			(starsCount: number, feedback?: string) => {
				rateArticleHandle(starsCount, feedback);
			},
			[rateArticleHandle]
		);

		if (isLoading) {
			return (
				<Skeleton width={"100%"} height={120} />
			);
		}

		const rating = data?.[0];

		return (
			<RatingCard
				rate={rating?.rate}
				onAccept={onAccept}
				onCancel={onCancel}
				hasFeedback
				feedbackTitle={t("Напишите отзыв!")}
				title={t("Оцените статью")}
				className={cn("", {}, [className])}
			/>
		);
	}
);

export default ArticleRating