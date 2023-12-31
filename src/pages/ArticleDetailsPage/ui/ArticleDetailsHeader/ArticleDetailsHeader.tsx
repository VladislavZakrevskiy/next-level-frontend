import { cn } from "@/shared/lib/classNames";
import { FC, useCallback } from "react";
import classes from "./ArticleDetailsHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { getArticleDetailsData } from "@/entities/Article/model/selectors/ArticleDetails";
import { HStack } from "@/shared/ui/Stack";
import {
	getRouteArticleEdit,
	getRouteArticles,
} from "@/shared/consts/router";

interface Props {
	className?: string;
}

export const ArticleDetailsHeader: FC<Props> = ({
	className,
}) => {
	const { t } = useTranslation("acticle");
	const nav = useNavigate();

	const userData = useSelector(getUserAuthData);
	const article = useSelector(
		getArticleDetailsData
	);
	const canEdit =
		userData?.id === article?.user.id;

	const onBackToList = useCallback(() => {
		nav(getRouteArticles());
	}, [nav]);

	const onEditArticle = useCallback(() => {
		nav(getRouteArticleEdit(article?.id ?? ''));
	}, [nav]);

	return (
		<HStack
			justify="between"
			max
			className={cn("", {}, [className])}
		>
			<Button onClick={onBackToList}>
				{t("Назад к списку")}
			</Button>
			{canEdit && (
				<Button onClick={onEditArticle}>
					{t("Редактировать")}
				</Button>
			)}
		</HStack>
	);
};
