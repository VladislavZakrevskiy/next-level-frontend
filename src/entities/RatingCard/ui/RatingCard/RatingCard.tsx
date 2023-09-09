import { cn } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./RatingCard.module.scss";
import {
	memo,
	useCallback,
	useState,
} from "react";
import { Card } from "@/shared/ui/Card";
import {
	HStack,
	VStack,
} from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { StarRating } from "@/shared/ui/StarRating";
import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import {
	Button,
	SizeButton,
	ThemeButton,
} from "@/shared/ui/Button";
import {
	BrowserView,
	MobileView,
} from "react-device-detect";
import { Drawer } from "@/shared/ui/Drawer";

interface RatingCardProps {
	className?: string;
	title?: string;
	feedbackTitle?: string;
	hasFeedback?: boolean;
	onCancel?: (starsCount: number) => void;
	onAccept?: (
		starsCount: number,
		feedback?: string
	) => void;
	rate?: number
}

export const RatingCard = memo(
	(props: RatingCardProps) => {
		const {
			className,
			feedbackTitle,
			hasFeedback,
			onAccept,
			onCancel, rate = 0,
			title,
		} = props;
		const { t } = useTranslation();
		const [isModalOpen, setIsModalOpen] =
			useState<boolean>(false);
		const [starCount, setStarCount] =
			useState<number>(rate);
		const [feedback, setFeedback] =
			useState<string>("");

		const onSelectStars = useCallback(
			(selectedStars: number) => {
				setStarCount(selectedStars);
				if (hasFeedback) {
					setIsModalOpen(true);
				} else onAccept?.(selectedStars);
			},
			[hasFeedback, onAccept]
		);

		const acceptHandler = useCallback(() => {
			setIsModalOpen(false);
			onAccept?.(starCount, feedback);
		}, [starCount, feedback, onAccept]);

		const cancelHandler = useCallback(() => {
			setIsModalOpen(false);
			onCancel?.(starCount);
		}, [starCount, onAccept]);

		const modalContent = (
			<>
				<Text title={feedbackTitle} />
				<Input
					value={feedback}
					onChange={(value) =>
						setFeedback(value)
					}
					placeholder={t("Ваш отзыв")}
				/>
			</>
		);

		return (
			<Card max className={cn("", {}, [className])}>
				<VStack max align="center" gap="8">
					<Text title={starCount ? t('Спасибо за оценку!') : title} />
					<StarRating selectedStars={starCount}
						size={40}
						onSelect={onSelectStars}
					/>
				</VStack>

				<BrowserView>
					<Modal lazy isOpen={isModalOpen}>
						<VStack max gap="32">
							{modalContent}
							<HStack max justify="end" gap="4">
								<Button
									onClick={cancelHandler}
									theme={ThemeButton.OUTLINE_RED}
								>
									{t("Отменить")}
								</Button>
								<Button onClick={acceptHandler}>
									{t("Отправить")}
								</Button>
							</HStack>
						</VStack>
					</Modal>
				</BrowserView>
				<MobileView>
					<Drawer
						lazy
						isOpen={isModalOpen}
						onClose={cancelHandler}
					>
						<VStack max gap="32">
							{modalContent}
							<Button
								fullWidth
								onClick={acceptHandler}
								size={SizeButton.L}
							>
								{t("Отправить")}
							</Button>
						</VStack>
					</Drawer>
				</MobileView>
			</Card>
		);
	}
);
