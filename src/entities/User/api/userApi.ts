import { rtkApi } from "@/shared/api/rtkApi";
import { User } from "../model/types/User";
import { jsonSettings } from "../model/types/jsonSettings";

interface setJsonSettingsProps {
	userId: string;
	jsonSettings: jsonSettings;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		setJsonSettings: build.mutation<
			User,
			setJsonSettingsProps
		>({
			query: ({ jsonSettings, userId }) => ({
				url: "/users/" + userId,
				method: "PATCH",
				body: {
					jsonSettings,
				},
			}),
		}),
		getJsonSettings: build.mutation<User, string>(
			{
				query: (userId) => ({
					url: "/users/" + userId,
					method: "GET",
				}),
			}
		),
	}),
});

export const setJsonSettingsMutation =
	userApi.endpoints.setJsonSettings.initiate;

export const getJsonSettingsMutation =
	userApi.endpoints.getJsonSettings.initiate;
