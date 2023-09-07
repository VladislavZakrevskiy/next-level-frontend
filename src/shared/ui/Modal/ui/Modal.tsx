import { cn, Mods } from "@/shared/lib/classNames";
import {
	FC,
	MutableRefObject,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import classes from "./Modal.module.scss";
import { Portal } from "@/shared/ui/Portal";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Overlay } from "@/shared/ui/Overlay";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";

interface Props {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

export const Modal: FC<Props> = ({
	className,
	children,
	isOpen,
	onClose,
	lazy,
}) => {
	const { closeHandler, isClosing, isMounting } =
		useModal({
			isOpen,
			onClose,
			animationDelay: 300,
		});
		
	const { theme } = useTheme();

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
				className={cn(classes.Modal, mods, [
					className,
					theme,
					"app_modal",
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
