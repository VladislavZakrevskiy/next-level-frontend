import { DeepPartial, Dispatch } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { loginByUsername } from './LoginByUsername'
import axios from 'axios'
import { UserActions } from 'entities/User'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

describe('loginByUsername.test', () => {
    // let dispatch: Dispatch
    // let getState: () => StateSchema

    // beforeEach(() => {
    //     dispatch = jest.fn()
    //     getState = jest.fn()
    // })

    // test('should return fulfilled', async () => {
    //     const userValue = { username: 'admin', id: '1' }

    //     mockedAxios.post.mockReturnValue(
    //         Promise.resolve({ data: userValue })
    //     )
    //     const action = loginByUsername({
    //         username: 'admin',
    //         password: '123',
    //     })
    //     const result = await action(
    //         dispatch,
    //         getState,
    //         undefined
    //     )
    //     expect(dispatch).toHaveBeenCalledWith(
    //         UserActions.setAuthData(userValue)
    //     )
    //     expect(dispatch).toHaveBeenCalledTimes(3)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('fulfilled')
    //     expect(result.payload).toEqual(userValue)
    // })

    // test('should return rejected', async () => {
    //     mockedAxios.post.mockReturnValue(
    //         Promise.resolve({ status: 403 })
    //     )
    //     const action = loginByUsername({
    //         username: 'admin',
    //         password: '123',
    //     })
    //     const result = await action(
    //         dispatch,
    //         getState,
    //         undefined
    //     )
    //     expect(dispatch).toHaveBeenCalledTimes(2)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('rejected')
    //     expect(result.payload).toEqual('error')
    // })

    test('should return fulfilled', async () => {
        const userValue = { username: 'admin', id: '1' }

        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({
            username: '123',
            password: '123',
        })

        expect(thunk.dispatch).toHaveBeenCalledWith(
            UserActions.setAuthData(userValue)
        )
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(userValue)
    })

    test('should return rejected', async () => {
        mockedAxios.post.mockReturnValue(
            Promise.resolve({ status: 403 })
        )
        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({
            username: '123',
            password: '123',
        })

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual('error')
    })
})
