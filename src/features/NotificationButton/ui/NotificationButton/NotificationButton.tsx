import { cn } from "shared/lib/classNames/classNames";
import classes from "./NotificationButton.module.scss";
import { memo } from "react";
import { Popover } from "shared/ui/Popups";
import {
	Button,
	ThemeButton,
} from "shared/ui/Button";
import { NotificationList } from "entities/Notifications";
import { Icon } from "shared/ui/Icon";
import TempIcon from "shared/assets/icons/about-20-20.svg";

interface NotificationButtonProps {
	className?: string;
}

export const NotificationButton = memo(
	(props: NotificationButtonProps) => {
		const { className } = props;

		return (
			<Popover
				className={cn("", {}, [className])}
				renderer={
					<Button theme={ThemeButton.CLEAR}>
						<Icon inverted Svg={TempIcon} />
					</Button>
				}
				direction="bottom-left"
			>
				<NotificationList
					className={classes.notifications}
				/>
			</Popover>
		);
	}
);
