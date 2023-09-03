import { Profile } from "entities/Profile"
import { ValidateProfileError } from "../consts/ValidateProfileError"

export interface editableProfileSchema {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
    validateError?: ValidateProfileError[]
}

