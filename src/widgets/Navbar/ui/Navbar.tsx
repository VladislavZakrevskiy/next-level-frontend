import { cn } from "../../../shared/lib/classNames/classNames";
import {
	useState,
	type FC,
	useCallback,
	memo,
} from "react";
import classes from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import {
	Button,
	ThemeButton,
} from "shared/ui/Button";
import { LoginModal } from "features/AuthByUsername";
import {
	useDispatch,
	useSelector,
} from "react-redux";
import {
	UserActions,
	getUserAuthData,
	isUserAdmin,
	isUserManager,
} from "entities/User";
import { Text, TextTheme } from "shared/ui/Text";
import {
	AppLink,
	AppLinkTheme,
} from "../../../shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Avatar } from "shared/ui/Avatar";
import { HStack } from "shared/ui/Stack";
import { Icon } from "shared/ui/Icon";
import {
	Dropdown,
	Popover,
} from "shared/ui/Popups";
import { NotificationButton } from "features/NotificationButton";
import { AvatarDropdown } from "features/AvatarDropdown";

interface NavbarProps {
	className?: string;
}

export const Navbar: FC<NavbarProps> = memo(
	({ className }) => {
		const { t } = useTranslation();
		const [isAuthModal, setIsAuthModal] =
			useState(false);
		const authData = useSelector(getUserAuthData);

		const onToggleModal = useCallback(() => {
			setIsAuthModal((prev) => !prev);
		}, []);

		if (authData) {
			return (
				<header
					className={cn(classes.navbar, {}, [
						className,
					])}
				>
					<Text
						className={classes.title}
						title="Zakrevskiy App"
						theme={TextTheme.INVERTED}
					/>
					<AppLink
						to={RoutePath.article_create}
						theme={AppLinkTheme.SECONDARY}
						// className={classes.createBtn}
					>
						{t("Создать статью")}
					</AppLink>
					<HStack gap="16">
						<NotificationButton />
						<AvatarDropdown />
					</HStack>
				</header>
			);
		}

		return (
			<header
				className={cn(classes.navbar, {}, [
					className,
				])}
			>
				<Button
					theme={ThemeButton.OUTLINE}
					className={classes.links}
					onClick={onToggleModal}
				>
					{t("Войти")}
				</Button>
				{isAuthModal && (
					<LoginModal
						isOpen={isAuthModal}
						onClose={onToggleModal}
					/>
				)}
			</header>
		);
	}
);
