import { UserSchema } from "entities/User";
import { loginSchema } from "features/AuthByUsername";

export interface StateSchema {
    user: UserSchema
    login: loginSchema
}