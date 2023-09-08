import { cn } from "@/shared/lib/classNames";
import { FC, useCallback, useState } from "react";
import classes from "./StarRating.module.scss";
import { Icon } from "../../Icon";
import StarIcon from "@/shared/assets/icons/star.svg";

interface Props {
	className?: string;
	onSelect?: (starCount: number) => void;
	size?: number;
	selectedStars?: number[];
}

const stars: number[] = [1, 2, 3, 4, 5];

export const StarRating: FC<Props> = ({
	className,
	size = 30,
	onSelect,
	selectedStars,
}) => {
	const [isHovered, setIsHovered] =
		useState(false);
	const [currentStar, setCurrentStar] =
		useState<number>(1);
	const [isSelected, setIsSelected] = useState(
		Boolean(selectedStars)
	);

	const onHover = useCallback(
		(starsCount: number) => () => {
			if (!isSelected) {
				setCurrentStar(starsCount);
			}
		},
		[isSelected, setCurrentStar]
	);

	const onLeave = useCallback(() => {
		if (!isSelected) {
			setCurrentStar(0);
		}
	}, [isSelected, setCurrentStar]);

	const onClick = (starsCount: number) => () => {
		if (!isSelected) {
			onSelect?.(starsCount);
			setCurrentStar(starsCount);
			setIsSelected(true);
		}
	};

	return (
		<div className={cn("", {}, [className])}>
			{stars.map((starNumber) => (
				<Icon
					Svg={StarIcon}
					key={starNumber}
					className={cn(
						classes.starIcon,
						{
							[classes.hovered]:
								currentStar >= starNumber,
							[classes.selected]: isSelected,
						},
						[classes.normal]
					)}
					width={size}
					height={size}
					onMouseLeave={onLeave}
					onMouseEnter={onHover(starNumber)}
					onClick={onClick(starNumber)}
				/>
			))}
		</div>
	);
};
