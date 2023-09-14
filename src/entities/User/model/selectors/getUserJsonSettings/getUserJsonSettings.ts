import { buildSelector } from "@/shared/lib/store/buildSelector";
import { jsonSettings } from "../../types/jsonSettings";

export const [useJsonSettings, getJsonSettings] =
	buildSelector(
		(state) => state.user.authData?.jsonSettings
	);

export const [
	useJsonSettingsByKey,
	getJsonSettingsByKey,
] = buildSelector(
	(state, key: keyof jsonSettings) =>
		state.user.authData?.jsonSettings?.[key]
);
