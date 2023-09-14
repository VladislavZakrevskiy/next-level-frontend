import { cn } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ActiclePageGreeting.module.scss";
import {
	memo,
	useCallback,
	useEffect,
	useState,
} from "react";
import { Modal } from "@/shared/ui/Modal";
import { Text } from "@/shared/ui/Text";
import {
	saveJsonSettings,
	useJsonSettings,
} from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { isMobile } from "react-device-detect";
import { Drawer } from "@/shared/ui/Drawer";

export const ActiclePageGreeting = memo(() => {
	const { t } = useTranslation();
	const { isArticlesPageHasOpened } =
		useJsonSettings() ?? {};
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const text = (
		<Text
			title={t(
				"Добро подаловать на страницу статей"
			)}
			text={t(
				"Здесь вы можете искать и просматривать статьи на различные темы"
			)}
		/>
	);

	useEffect(() => {
		if (!isArticlesPageHasOpened) {
			setIsOpen(true);
			dispatch(
				saveJsonSettings({
					isArticlesPageHasOpened: true,
				})
			);
		}
	}, [dispatch, isArticlesPageHasOpened]);

	const onClose = useCallback(
		() => setIsOpen(false),
		[setIsOpen]
	);

	if (isMobile) {
		return (
			<Drawer
				lazy
				isOpen={isOpen}
				onClose={onClose}
			>
				{text}
			</Drawer>
		);
	}

	return (
		<Modal lazy isOpen={isOpen} onClose={onClose}>
			{text}
		</Modal>
	);
});
