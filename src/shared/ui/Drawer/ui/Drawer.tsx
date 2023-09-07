import { Mods, cn } from "shared/lib/classNames";
import {
	FC,
	ReactNode,
	useCallback,
	useEffect,
} from "react";
import classes from "./Drawer.module.scss";
import { Portal } from "shared/ui/Portal";
import { Overlay } from "shared/ui/Overlay";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import { useAnimationModules } from "shared/lib/components/AnimationProvider";

interface Props {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent: FC<Props> = ({
	className,
	children,
	isOpen,
	lazy,
	onClose,
}) => {
	const {
		Gesture: { useDrag },
		Spring: { useSpring, config, a },
	} = useAnimationModules();
	const [{ y }, api] = useSpring(() => ({
		y: height,
	}));

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

	const openDrawer = useCallback(() => {
		api.start({ y: 0, immediate: false });
	}, [api]);

	useEffect(() => {
		if (isOpen) {
			openDrawer();
		}
	}, [isOpen, api, openDrawer]);

	const close = (velocity = 0) => {
		api.start({
			y: height,
			immediate: false,
			config: { ...config.stiff, velocity },
			onResolve: onClose,
		});
	};

	const bind = useDrag(
		({
			last,
			velocity: [, vy],
			direction: [, dy],
			movement: [, my],
			cancel,
		}) => {
			if (my < -70) cancel();

			if (last) {
				if (
					my > height * 0.5 ||
					(vy > 0.5 && dy > 0)
				) {
					close();
				} else openDrawer();
			} else
				api.start({ y: my, immediate: true });
		},
		{
			from: () => [0, y.get()],
			filterTaps: true,
			bounds: { top: 0 },
			rubberband: true,
		}
	);

	if (!isOpen) {
		return null;
	}

	// if (lazy && !isMounting) {
	// 	return null;
	// }

	const display = y.to((py) =>
		py < height ? "block" : "none"
	);

	return (
		<Portal>
			<div
				className={cn(classes.Drawer, mods, [
					className,
					"app_drawer",
				])}
			>
				<Overlay onClick={closeHandler} />
				<a.div
					{...bind()}
					className={classes.sheet}
					style={{
						display,
						bottom: `calc(-aoovh + ${
							height - 100
						}px)`,
						y,
					}}
				>
					{children}
				</a.div>
			</div>
		</Portal>
	);
};

export const Drawer = (props: Props) => {
	const { isLoaded } = useAnimationModules();

	if (!isLoaded) {
		return null;
	}

	return <DrawerContent {...props} />;
};
