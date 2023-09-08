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
			<Menu.Button
				className={popupClasses.renderer}
			>
				{renderer}
			</Menu.Button>
			<Menu.Items
				className={cn(classes.items, {}, [
					popupClasses[direction],
				])}
			>
				{items.map((item, index) => {
					const content = ({
						active,
					}: {
						active: boolean;
					}) => (
						<button
							type="button"
							disabled={item.disabled}
							onClick={item.onClick}
							className={cn(classes.item, {
								[popupClasses.active]: active,
							})}
						>
							{item.content}
						</button>
					);

					if (item.href) {
						return (
							<Menu.Item
								as={AppLink}
								to={item.href}
								disabled={item.disabled}
								key={`dropdown-key-${index}`}
							>
								{content}
							</Menu.Item>
						);
					}

					return (
						<Menu.Item
							key={`dropdown-key-${index}`}
							as={React.Fragment}
							disabled={item.disabled}
						>
							{content}
						</Menu.Item>
					);
				})}
			</Menu.Items>
		</Menu>
	);
};
