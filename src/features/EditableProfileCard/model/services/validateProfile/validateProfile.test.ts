import { Currency } from 'entities/Currency'
import { validateProfile } from './validateProfile'
import { Country } from 'entities/Country'
import { ValidateProfileError } from "../../consts/ValidateProfileError"

const data = {
    username: 'admin',
    age: 17,
    country: Country.Russia,
    lastname: 'zakrevskiy',
    first: 'vlad',
    city: 'znm',
    currency: Currency.RUB,
}

describe('fetchProfileData.test', () => {
    test('success', () => {
        const result = validateProfile(data)

        expect(result).toEqual([])
    })

    test('error first and lastname', () => {
        const result = validateProfile({
            ...data,
            first: '',
            lastname: '',
        })

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ])
    })

    test('error age', () => {
        const result = validateProfile({
            ...data,
            age: undefined,
        })

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ])
    })

    test('error country', () => {
        const result = validateProfile({
            ...data,
            country: undefined,
        })

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_COUNTRY,
        ])
    })

    test('error mixed', () => {
        const result = validateProfile({
            ...data,
            first: '',
            lastname: '',
            age: undefined,
            country: undefined,
        })

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ])
    })

    test('error empty', () => {
        const result = validateProfile()

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ])
    })
})
