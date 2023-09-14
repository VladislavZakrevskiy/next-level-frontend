import { getJsonSettingsMutation } from "../../api/userApi";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { jsonSettings } from "../types/jsonSettings";
import { getUserAuthData } from "../selectors/getUserAuthData/getUserAuthData";
import { getJsonSettings } from "../selectors/getUserJsonSettings/getUserJsonSettings";
import { User } from "../types/User";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/consts/localStorage";

export const initAuthData = createAsyncThunk<
	User,
	void,
	ThunkConfig<string>
>(
	"user/initAuthData",
	async (
		_,
		{
			rejectWithValue,
			dispatch,
			getState,
			extra: { api },
		}
	) => {
		const userId = localStorage.getItem(
			LOCAL_STORAGE_THEME_KEY
		);

		if (!userId) {
			return rejectWithValue("error");
		}

		try {
			const response = await dispatch(
				getJsonSettingsMutation(userId)
			).unwrap();

			if (!response.jsonSettings) {
				return rejectWithValue("error");
			}

			return response;
		} catch (err) {
			console.error(err);
			return rejectWithValue("error");
		}
	}
);
