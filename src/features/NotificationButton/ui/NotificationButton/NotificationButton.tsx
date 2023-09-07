import { cn } from "@/shared/lib/classNames/classNames";
import classes from "./NotificationButton.module.scss";
import { memo, useState } from "react";
import { Popover } from "@/shared/ui/Popups";
import {
	Button,
	ThemeButton,
} from "@/shared/ui/Button";
import { NotificationList } from "@/entities/Notifications";
import { Icon } from "@/shared/ui/Icon";
import TempIcon from "@/shared/assets/icons/about-20-20.svg";
import { Drawer } from "@/shared/ui/Drawer";
import {
	BrowserView,
	MobileView,
} from "react-device-detect";
import { AnimationProvider } from "@/shared/lib/components/AnimationProvider";

interface NotificationButtonProps {
	className?: string;
}

export const NotificationButton = memo(
	(props: NotificationButtonProps) => {
		const { className } = props;
		const [isOpen, setIsOpen] =
			useState<boolean>(false);

		const renderer = (
			<Button
				onClick={() => setIsOpen(true)}
				theme={ThemeButton.CLEAR}
			>
				<Icon inverted Svg={TempIcon} />
			</Button>
		);

		return (
			<div>
				<BrowserView>
					<Popover
						className={cn("", {}, [className])}
						renderer={renderer}
						direction="bottom-left"
					>
						<NotificationList
							className={classes.notifications}
						/>
					</Popover>
				</BrowserView>

				<MobileView>
					{renderer}
					<AnimationProvider>
						<Drawer
							onClose={() => setIsOpen(false)}
							isOpen={isOpen}
						>
							<NotificationList />
						</Drawer>
					</AnimationProvider>
				</MobileView>
			</div>
		);
	}
);
