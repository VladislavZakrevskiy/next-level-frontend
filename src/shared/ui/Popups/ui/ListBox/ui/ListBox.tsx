import { cn } from "@/shared/lib/classNames";
import React, { FC, ReactNode } from "react";
import classes from "./ListBox.module.scss";
import { Listbox as HListBox } from "@headlessui/react";
import { Button } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";
import { DropdownDirection } from "@/shared/types/ui";
import popupClasses from "../../../styles/popup.module.scss";

export interface ListBoxItem {
	value: string;
	content: ReactNode;
	disabled?: boolean;
}

interface Props {
	className?: string;
	items: ListBoxItem[];
	value?: string;
	defaultValue?: string;
	onChange?: <T extends string>(value: T) => void;
	readOnly?: boolean;
	direction?: DropdownDirection;
	label?: string;
}

export const ListBox: FC<Props> = ({
	className,
	items,
	value,
	defaultValue,
	onChange,
	readOnly,
	direction = "bottom-left",
	label,
}) => {
	return (
		<HStack gap="4">
			{label && <span>{label + ">"}</span>}
			<HListBox
				disabled={readOnly}
				as={"div"}
				className={cn(popupClasses.popup, {}, [
					className,
				])}
				value={value}
				onChange={onChange}
			>
				<HListBox.Button
					className={classes.trigger}
				>
					<Button disabled={readOnly}>
						{value ?? defaultValue}
					</Button>
				</HListBox.Button>
				<HListBox.Options
					className={cn(classes.options, {}, [
						popupClasses[direction],
					])}
				>
					{items.map((item) => {
						return (
							<HListBox.Option
								key={item.value}
								disabled={item.disabled}
								value={item.value}
								as={React.Fragment}
							>
								{({ active }) => (
									<li
										className={cn(classes.option, {
											[popupClasses.active]:
												active,
                                            [popupClasses.disabled]:
                                                item.disabled
										})}
									>
										{item.content}
									</li>
								)}
							</HListBox.Option>
						);
					})}
				</HListBox.Options>
			</HListBox>
		</HStack>
	);
}
