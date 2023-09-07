import { Mods, cn } from "shared/lib/classNames";
import { FC, ReactNode } from "react";
import classes from "./Drawer.module.scss";
import { useTheme } from "app/providers/ThemeProvider";
import { Portal } from "shared/ui/Portal";
import { Overlay } from "shared/ui/Overlay";
import { useModal } from "shared/lib/hooks/useModal/useModal";

interface Props {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

export const Drawer: FC<Props> = ({
	className,
	children,
	isOpen,
	lazy,
	onClose,
}) => {
	const { closeHandler, isClosing, isMounting } =
		useModal({
			isOpen,
			onClose,
			animationDelay: 300,
		});

	const mods: Mods = {
		[classes.opened]: isOpen,
		[classes.isClosing]: isClosing,
	};

	if (lazy && !isMounting) {
		return null;
	}

	return (
		<Portal>
			<div
				className={cn(classes.Drawer, mods, [
					className,
					"app_drawer",
				])}
			>
				<Overlay onClick={closeHandler} />
				<div className={classes.content}>
					{children}
				</div>
			</div>
		</Portal>
	);
};
