import { FeatureFlags } from "@/shared/types/featureFlags";
import { UserRoles } from "../consts/UserRoles";
import { jsonSettings } from "./jsonSettings";

export interface User {
	id: string;
	username: string;
	avatar?: string;
	roles?: UserRoles[];
	features?: FeatureFlags;
	jsonSettings?: jsonSettings;
}

export interface UserSchema {
	authData?: User;

	_inited: boolean;
}
