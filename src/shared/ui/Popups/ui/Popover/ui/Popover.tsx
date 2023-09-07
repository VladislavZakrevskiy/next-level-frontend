import { cn } from "@/shared/lib/classNames";
import { FC, ReactNode } from "react";
import classes from "./Popover.module.scss";
import { Popover as HPopover } from "@headlessui/react";
import popupClasses from "../../../styles/popup.module.scss";
import { DropdownDirection } from "@/shared/types/ui";

interface Props {
	className?: string;
	renderer: ReactNode;
	direction?: DropdownDirection;
    children: ReactNode
}

export const Popover: FC<Props> = ({
	className,
	renderer,
	direction = 'bottom-right',
    children
}) => {
	return (
		<HPopover
			className={cn(popupClasses.popup, {}, [
				className,
			])}
		>
			<HPopover.Button
				className={popupClasses.renderer}
			>
				{renderer}
			</HPopover.Button>

			<HPopover.Panel
				className={cn(classes.panel, {}, [
					popupClasses[direction],
				])}
			>
                {children}
            </HPopover.Panel>
		</HPopover>
	);
};
