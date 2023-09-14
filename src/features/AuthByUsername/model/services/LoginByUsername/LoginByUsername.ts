import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import {
	User,
	UserActions,
} from "@/entities/User";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/consts/localStorage";
import { setFeatureFlags } from "@/shared/lib/features";

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export enum LoginErrors {
	INCORRECT_DATA = "",
	SERVER_ERROR = "",
}

export const loginByUsername = createAsyncThunk<
	User,
	LoginByUsernameProps,
	ThunkConfig<string>
>(
	"auth/loginByUsername",
	async (
		authData,
		{ rejectWithValue, dispatch, extra: { api } }
	) => {
		try {
			const response = await api.post<User>(
				"/login",
				authData
			);

			if (!response.data) {
				throw new Error();
			}

			dispatch(
				UserActions.setAuthData(response.data)
			);
			setFeatureFlags(response.data.features);
			return response.data;
		} catch (err) {
			console.error(err);
			return rejectWithValue("error");
		}
	}
);
