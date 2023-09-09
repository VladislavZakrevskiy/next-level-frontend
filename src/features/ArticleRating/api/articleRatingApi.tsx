import { Rating } from "@/entities/RatingCard";
import { rtkApi } from "@/shared/api/rtkApi";

interface GetArticleRatingProps {
	userId: string;
	articleId: string;
}

interface RateArticleProps {
	userId: string;
	articleId: string;
	rate: number;
	feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getArticleRating: build.query<
			Rating[],
			GetArticleRatingProps
		>({
			query: ({ articleId, userId }) => ({
				url: "/article-ratings",
				params: { articleId, userId },
			}),
		}),
		rateArticle: build.mutation<
			void,
			RateArticleProps
		>({
			query: (arg) => ({
				url: "/article-ratings",
				method: 'POST',
                body: arg
			}),
		}),
	}),
});

export const { useGetArticleRatingQuery, useRateArticleMutation } =
	articleRatingApi;
