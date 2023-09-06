import { cn } from "shared/lib/classNames";
import { FC } from "react";
import classes from "./NotificationItem.module.scss";
import { Notification } from "../../model/types/Notifications";
import { Card, CardTheme } from "shared/ui/Card";
import { Text } from "shared/ui/Text";
import { AppLink } from "shared/ui/AppLink";

interface Props {
	className?: string;
	notification: Notification;
}

export const NotificationItem: FC<Props> = ({
	className,
	notification,
}) => {
	const content = (
		<Card
			theme={CardTheme.OUTLINED}
			className={cn(
				classes.NotificationItem,
				{},
				[className]
			)}
		>
			<Text
				title={notification.title}
				text={notification.description}
			/>
		</Card>
	);

	if (notification.href) {
		return (
			<AppLink
				className={classes.link}
				target="_blank"
				to={notification.href}
			>
				{content}
			</AppLink>
		);
	}

	return content;
};
