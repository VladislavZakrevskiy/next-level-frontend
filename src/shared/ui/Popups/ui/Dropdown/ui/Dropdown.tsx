import { cn } from "@/shared/lib/classNames";
import React, { FC, ReactNode } from "react";
import classes from "./Dropdown.module.scss";
import { Menu } from "@headlessui/react";
import { DropdownDirection } from "@/shared/types/ui";
import { AppLink } from "@/shared/ui/AppLink";
import popupClasses from "../../../styles/popup.module.scss";

export interface DropdownItem {
	disabled?: boolean;
	content: ReactNode;
	onClick?: () => void;
	href?: string;
}

interface Props {
	className?: string;
	items: DropdownItem[];
	renderer: ReactNode;
	direction?: DropdownDirection;
}

export const Dropdown: FC<Props> = ({
	className,
	items,
	renderer,
	direction = "bottom-left",
}) => {
	return (
		<Menu
			as="div"
			className={cn(popupClasses.popup, {}, [
				className,
			])}
		>
			<Menu.Button className={popupClasses.renderer}>
				{renderer}
			</Menu.Button>
			<Menu.Items
				className={cn(classes.items, {}, [
					popupClasses[direction],
				])}
			>
				{items.map((item) => (
					<Menu.Item as={React.Fragment}>
						{({ active }) => {
							if (item.href) {
								return (
									<AppLink
										className={cn(
											classes.item,
											{
												[popupClasses.active]:
													active,
											},
											[]
										)}
										to={item.href}
									>
										{item.content}
									</AppLink>
								);
							}

							return (
								<button
									className={cn(
										classes.item,
										{
											[popupClasses.active]:
												active,
										},
										[]
									)}
								>
									{item.content}
								</button>
							);
						}}
					</Menu.Item>
				))}
			</Menu.Items>
		</Menu>
	);
};
