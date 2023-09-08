import { cn } from "@/shared/lib/classNames";
import { FC } from "react";
import classes from "./Icon.module.scss";

interface Props
	extends React.SVGProps<SVGSVGElement> {
	className?: string;
	Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
	inverted?: boolean;
}

export const Icon: FC<Props> = ({
	className,
	Svg,
	inverted,
	...otherProps
}) => {
	return (
		<Svg
			{...otherProps}
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
