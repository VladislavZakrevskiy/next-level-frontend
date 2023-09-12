import { FC, ReactNode } from "react";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/shared/config/i18n/i18n";
import { MemoryRouter } from "react-router-dom";
import {
	StateSchema,
	StoreProvider,
} from "@/app/providers/StoreProvider";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { Theme } from '../../../consts/theme';
import '@/app/styles/index.scss'
import { ThemeProvider } from "@/app/providers/ThemeProvider";

export interface ComponentRenderOptions {
	route?: string;
	iniitialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<
		ReducersMapObject<StateSchema>
	>;
	theme?: Theme 
}

interface TestProviderProps {
	children: ReactNode;
	options?: ComponentRenderOptions;
}

export const TestProvider: FC<
	TestProviderProps
> = ({ children, options = {} }) => {
	const {
		asyncReducers,
		iniitialState,
		route = "/",
		theme = Theme.LIGHT
	} = options;

	return (
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider
				asyncReducers={asyncReducers}
				initialSchema={iniitialState}
			>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider initialTheme={theme}>
						<div className={`app ${theme}`}>
							{children}
						</div>
					</ThemeProvider>
				</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>
	);
};

export const componentRender = (
	component: ReactNode,
	options: ComponentRenderOptions
) => {
	return render(
		<TestProvider options={options}>
			{component}
		</TestProvider>
	);
};
