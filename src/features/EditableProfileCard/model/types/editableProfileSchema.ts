import { Profile } from "entities/Profile"

export interface editableProfileSchema {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
    validateError?: ValidateProfileError[]
}

export enum ValidateProfileError {
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = "SERVER_ERROR",
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY'
}