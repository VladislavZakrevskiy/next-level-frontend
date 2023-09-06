import { rtkApi } from "shared/api/rtkApi";
import { Notification } from "../model/types/Notifications";

const notificationsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		geNotifications: build.query<
			Notification[],
			void
		>({
			query: () => ({
				url: "/notifications",
			}),
		}),
	}),
});

export const { useGeNotificationsQuery } =
	notificationsApi;
