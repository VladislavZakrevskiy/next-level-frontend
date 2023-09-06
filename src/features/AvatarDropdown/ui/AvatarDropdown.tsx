import { cn } from "shared/lib/classNames";
import { FC, useCallback } from "react";
import classes from "./AvatarDropdown.module.scss";
import { Avatar } from "shared/ui/Avatar";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useTranslation } from "react-i18next";
import { Dropdown } from "shared/ui/Popups";
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

interface Props {
	className?: string;
}

export const AvatarDropdown: FC<Props> = ({
	className,
}) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const authData = useSelector(getUserAuthData);
	const isAdmin = useSelector(isUserAdmin);
	const isManager = useSelector(isUserManager);

	const onLogout = useCallback(() => {
		dispatch(UserActions.logout());
	}, []);

	const isAdminPanelAvailable =
		isAdmin || isManager;

	if (!authData) {
		return null;
	}

	return (
		<Dropdown
			className={cn(classes.dropdown, {}, [
				className,
			])}
			direction="bottom-left"
			renderer={
				<Avatar
					src={authData.avatar || ""}
					alt="Avatar"
					size={30}
				/>
			}
			items={[
				...(isAdminPanelAvailable
					? [
							{
								content: t("Админка"),
								href: RoutePath.admin_panel,
							},
					  ]
					: []),
				{
					content: t("Профиль"),
					onClick: onLogout,
					href: RoutePath.profile + authData.id,
				},
				{
					content: t("Выйти"),
					onClick: onLogout,
				},
			]}
		/>
	);
};
