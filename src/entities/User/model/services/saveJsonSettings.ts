import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { jsonSettings } from "../types/jsonSettings";
import { getUserAuthData } from "../selectors/getUserAuthData/getUserAuthData";
import { setJsonSettingsMutation } from "../../api/userApi";
import { getJsonSettings } from "../selectors/getUserJsonSettings/getUserJsonSettings";

export const saveJsonSettings = createAsyncThunk<
	jsonSettings,
	jsonSettings,
	ThunkConfig<string>
>(
	"user/saveJsonSettings",
	async (
		jsonSettings,
		{
			rejectWithValue,
			dispatch,
			getState,
			extra: { api },
		}
	) => {
		const authData = getUserAuthData(getState());
		const currentSettings = getJsonSettings(
			getState()
		);

		if (!authData) {
			return rejectWithValue("error");
		}

		try {
			const response = await dispatch(
				setJsonSettingsMutation({
					jsonSettings: {
						...currentSettings,
						...jsonSettings,
					},
					userId: authData.id,
				})
			).unwrap();

			if (!response.jsonSettings) {
				return rejectWithValue("error");
			}

			return response.jsonSettings;
		} catch (err) {
			console.error(err);
			return rejectWithValue("error");
		}
	}
);
