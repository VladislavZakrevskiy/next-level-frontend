import { cn } from "shared/lib/classNames";
import { FC } from "react";
import classes from "./NotificationList.module.scss";
import { useGeNotificationsQuery } from "entities/Notifications/api/NotificationApi";
import { VStack } from "shared/ui/Stack";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { Skeleton } from "shared/ui/Skeleton";

interface Props {
	className?: string;
}

export const NotificationList: FC<Props> = ({
	className,
}) => {
	const { data: notifications, isLoading } =
		useGeNotificationsQuery(undefined, {
			pollingInterval: 5000,
		});

	if (isLoading) {
		return (
			<VStack
				max
				gap="16"
				className={cn(
					classes.NotificationList,
					{},
					[className]
				)}
			>
				<Skeleton
					width={"100%"}
					border="8px"
					height={"80px"}
				/>
				<Skeleton
					width={"100%"}
					border="8px"
					height={"80px"}
				/>
				<Skeleton
					width={"100%"}
					border="8px"
					height={"80px"}
				/>
			</VStack>
		);
	}

	return (
		<VStack
			max
			gap="16"
			className={cn(
				classes.NotificationList,
				{},
				[className]
			)}
		>
			{notifications?.map((notification) => (
				<NotificationItem
					notification={notification}
				/>
			))}
		</VStack>
	);
};
