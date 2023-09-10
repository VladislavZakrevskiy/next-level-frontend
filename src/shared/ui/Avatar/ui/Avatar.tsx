import { cn } from "@/shared/lib/classNames";
import {
	CSSProperties,
	FC,
	useMemo,
} from "react";
import classes from "./Avatar.module.scss";
import { AppImage } from "../../AppImage";
import { Icon } from "../../Icon";
import { Skeleton } from "../../Skeleton";

interface Props {
	className?: string;
	src: string;
	alt: string;
	size?: number;
    fallbackInverted?: boolean
}

export const Avatar: FC<Props> = ({
	className,
	alt,
	src,
	size, fallbackInverted
}) => {
	const styles = useMemo<CSSProperties>(
		() => ({
			width: size || 100,
			height: size || 100,
		}),
		[size]
	);

	return (
		<AppImage
			fallback={
				<Skeleton
					border="50%"
					width={size}
					height={size}
				/>
			}
			errorFallback={
				<Icon inverted={fallbackInverted} width={size} height={size} Svg={} />
			}
			src={src}
			alt={alt}
			style={styles}
			className={cn(classes.Avatar, {}, [
				className,
			])}
		/>
	);
};
