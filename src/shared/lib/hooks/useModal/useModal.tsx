import {
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

interface useModalProps {
	onClose?: () => void;
	isOpen?: boolean;
	animationDelay?: number;
}

export const useModal = ({
	animationDelay,
	isOpen,
	onClose,
}: useModalProps) => {

	const [isClosing, setIsClosing] =
		useState(false);
	const [isMounting, setIsMounting] =
		useState(false);
	const timerRef = useRef<
		ReturnType<typeof setTimeout>
	>() as MutableRefObject<
		ReturnType<typeof setTimeout>
	>;

	useEffect(() => {
		if (isOpen) {
			setIsMounting(true);
		}
	}, [isOpen]);

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, animationDelay);
		}
	}, [onClose, animationDelay]);

	const onKeyDown = useCallback(
		(ev: KeyboardEvent) => {
			if (ev.key === "Escape") {
				closeHandler();
			}
		},
		[closeHandler]
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener(
				"keydown",
				onKeyDown
			);
		}

		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener(
				"keydown",
				onKeyDown
			);
		};
	}, [onKeyDown, isOpen]);

	return {isClosing, isMounting, closeHandler}
};
