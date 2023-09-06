import { Mods, cn } from "shared/lib/classNames";
import { FC, ReactNode } from "react";
import classes from "./Drawer.module.scss";
import { useTheme } from "app/providers/ThemeProvider";
import { Portal } from "shared/ui/Portal";
import { Overlay } from "shared/ui/Overlay";

interface Props {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

export const Drawer: FC<Props> = ({
	className,
	children,
	isOpen,
	onClose,
}) => {
	const { theme } = useTheme();
	const mods: Mods = {
		[classes.opened]: isOpen,
	};
	return (
		<Portal>
			<div
				className={cn(classes.Drawer, {}, [
					className,
					"app_drawer",
				])}
			>
				<Overlay onClick={onClose} />
				<div className={classes.content}>
					{children}
				</div>
			</div>
		</Portal>
	);
};
