import { cn } from "@/shared/lib/classNames";
import { FC } from "react";
import classes from "./Icon.module.scss";

interface Props {
	className?: string;
	Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
	inverted?: boolean;
}

export const Icon: FC<Props> = ({
	className,
	Svg,
	inverted,
}) => {
	return (
		<Svg
			className={cn(
				inverted
					? classes.inverted
					: classes.Icon,
				{},
				[className]
			)}
		/>
	);
};
